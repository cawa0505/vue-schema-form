import FormField from '@/schema-form/field';
import {
  DESKTOP,
  getButtonComponent,
  getDefaultValue,
  getFormComponent,
  getRowComponent,
  MOBILE,
  TYPES
} from '@/schema-form/utils';
import {getFieldValue, setFieldValue} from '@/schema-form/utils/field';
import {FormDescriptor, FormProps, Platform, SchemaFormField, ShowFieldCondition} from '@/types/bean';
import {Effects} from '@/types/form';
import {IField} from '@/uform/types';
import {parseDestructPath} from '@/uform/utils';
import {ValidateRules} from 'async-validator';
import difference from 'lodash.difference';
import eq from 'lodash.eq';
import get from 'lodash.get';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

function getPropertyValueByPath(property: string, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
  return get(currentValue, property);
}


@Component({
  name: 'BaseForm'
})
export default class BaseForm extends Vue {

  @Prop(Object)
  public definition: FormDescriptor;
  @Prop({type: String, default: 'desktop'})
  public platform: Platform;
  @Prop({type: Object, default: () => ({})})
  public props: FormProps;
  @Prop([Array, Object])
  public value: { [key: string]: any } | Array<{ [key: string]: any }>;
  @Prop({type: String, default: 'edit'})
  public mode: 'edit' | 'display';
  @Prop({type: Boolean, default: false})
  public inline: boolean;
  @Prop(Object)
  public rules: ValidateRules;
  @Prop()
  public title: VNode | string;
  @Prop({type: Number})
  public arrayIndex: number;
  @Prop(Array)
  public pathPrefix: string[];
  @Prop()
  public effects: Effects;
  public currentValue: { [key: string]: any } | Array<{ [key: string]: any }> = null;
  public fields: any[] = [];

  @Watch('currentValue', {deep: true})
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  }

  @Watch('definitions')
  public definitionsChanged() {
    const currentValue = this.currentValue;
    const value = this.value;
    if (this.definition.array) {
      if (difference(currentValue as any[], value as any[])
        .concat(difference(value as any[], currentValue as any[])).length > 0) {
        this.buildExtraProperties();
      }
    } else if (!eq(currentValue, value)) {
      this.buildExtraProperties();
    }
  }

  @Watch('platform')
  public platformChanged() {
    this.$forceUpdate();
  }

  @Watch('value', {immediate: true, deep: true})
  public valueChanged(value: any[] | any) {
    if (value !== this.currentValue) {
      const currentValue = this.currentValue;
      if (this.definition.array) {
        if (difference(currentValue as any[], value as any[])
          .concat(difference(value as any[], currentValue as any[])).length > 0) {
          this.currentValue = value || [];
          this.buildExtraProperties();
        }
      } else if (!eq(currentValue, value)) {
        this.currentValue = value || {};
        this.buildExtraProperties();
      }
    } else if (!value) {
      this.currentValue = {};
      this.buildExtraProperties();
    }
  }

  public created() {
    if (this.value) {
      if (this.definition.array) {
        if (this.value.length) {
          this.currentValue = this.value;
        } else {
          this.currentValue = [{}];
        }
      } else {
        this.currentValue = this.value;
      }
    } else {
      this.currentValue = this.definition.array ? [{}] : {};
    }
    this.buildExtraProperties();
  }

  get realFields() {
    const fields = this.definition.fields;
    if (typeof fields === 'object') {
      return Object.keys(fields)
        .filter(key => fields[key])
        .map(key => ({
          property: key,
          ...fields[key]
        }));
    } else {
      return (fields as SchemaFormField[]).filter(it => it !== null && it !== undefined);
    }
  }

  public setDefaultValue(property, tmpValue, fieldDef) {
    let copy = tmpValue;
    const splits = property.split('.');
    splits.forEach((name, index) => {
      if (index < splits.length - 1) {
        if (!copy[name]) {
          this.$set(copy, name, {});
        }
        copy = copy[name];
      } else {
        copy[name] = getDefaultValue(this.createField(fieldDef));
      }
    });
  }

  public buildExtraProperties() {
    const {value} = this;
    let currentValue = this.currentValue;
    this.realFields.forEach(fieldDef => {
      const field = this.createField(fieldDef);
      if (typeof field.destructPath.destruct === 'string') {
        const property = fieldDef.property;
        if (this.definition.array) {
          if (!currentValue || !Array.isArray(currentValue)) {
            currentValue = [];
          }
          currentValue.forEach(tmpValue => {
            if (property.includes('.')) {
              this.setDefaultValue(property, tmpValue, fieldDef);
            } else {
              if (!tmpValue || tmpValue[property] === undefined) {
                this.$set(tmpValue, property, getDefaultValue(field));
              } else if (value && value.length) {
                this.$set(tmpValue, property, value[0][fieldDef.property]);
              }
            }
          });
        } else {
          const tmpValue = currentValue;
          if (property.includes('.')) {
            this.setDefaultValue(property, tmpValue, fieldDef);
          } else {
            if (!tmpValue || tmpValue[property] === undefined) {
              this.$set(tmpValue, property, getDefaultValue(field));
            } else if (value) {
              this.$set(tmpValue, property, value[fieldDef.property]);
            }
          }
        }
      }
    });
  }

  public render() {
    return <div class="schema-form">
      {this.$slots.header}
      {this.definition.array ? this.renderTitle() : null}
      {this.renderFields()}
      {this.renderAddFormButton()}
      {this.renderButtons()}
      {this.$slots.footer}
    </div>;
  }

  get form(): any {
    return this.$refs.form;
  }

  private renderButtons() {
    const {props} = this;
    const ButtonComponent = getButtonComponent();
    if (props && this.mode === 'edit') {
      if (this.$slots.btns) {
        return this.$slots.btns;
      }
      if (this.platform === 'mobile') {
        return <div class="action-btns">
          {this.hasListener('ok') ? <m-white-space/> : null}
          {this.hasListener('ok') ? <m-button type="primary"
                                              disabled={this.isDisabled}
                                              loading={this.isLoading}
                                              attrs={props && props.okProps}
                                              onClick={() => {
                                                this.onOk();
                                              }}>
            {props && props.okText || '保存'}
          </m-button> : null}
          {this.hasListener('cancel') ? <m-white-space/> : null}
          {this.hasListener('cancel') ? <m-button
            disabled={this.isDisabled || this.isDisabled}
            onClick={() => {
              this.$emit('cancel');
            }}
            attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </m-button> : null}
          {this.hasListener('reset') ? <m-white-space/> : null}
          {this.hasListener('reset') ? <m-button
            disabled={this.isDisabled || this.isLoading}
            type="error"
            onClick={() => {
              this.$emit('reset');
            }}
            attrs={props && props.resetProps}>
            {props && props.resetText || '重置'}
          </m-button> : null}
        </div>;
      } else {
        return <div class="action-btns">
          {this.hasListener('cancel') ? <ButtonComponent disabled={this.isDisabled || this.isLoading}
                                                         onClick={() => {
                                                           this.$emit('cancel');
                                                         }}
                                                         class="cancel-btn"
                                                         attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </ButtonComponent> : null}
          {this.hasListener('ok') ? <ButtonComponent type="primary"
                                                     disabled={this.isDisabled}
                                                     loading={this.isLoading}
                                                     class="confirm-btn"
                                                     attrs={props && props.okProps}
                                                     onClick={() => {
                                                       this.onOk();
                                                     }}>
            {props && props.okText || '保存'}
          </ButtonComponent> : null}
          {this.hasListener('reset') ? <ButtonComponent type="danger"
                                                        class="reset-btn"
                                                        disabled={this.isDisabled || this.isLoading}
                                                        attrs={props && props.resetProps}
                                                        onClick={() => {
                                                          this.$emit('reset', this.currentValue);
                                                        }}>
            {props && props.resetText || '重置'}
          </ButtonComponent> : null}
        </div>;
      }
    }
  }

  private renderTitle() {
    if (this.$slots.title) {
      return this.$slots.title;
    } else if (this.props && this.title) {
      return <h2 class="form-title">{this.title}</h2>;
    }
  }

  private async onOk(this: any) {
    if (this.hasListener('ok')) {
      if (this.form && this.form.validate) {
        const valid = await this.validate();
        const errors = valid.filter((it: any) => it && it !== true).flat();
        if (errors.length) {
          console.warn('有错误', errors);
          this.$message.error(errors[0].message);
        } else {
          this.$emit('ok', this.currentValue);
        }
      } else {
        this.$emit('ok', this.currentValue);
      }
    }
  }

  private getGroups(currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const groups = [];
    const spanGroups = [];
    let lastHasSpan = false;
    this.realFields.forEach((field, index) => {
      const vnode = this.renderField(field, currentValue, index);
      if (field.span) {
        if (lastHasSpan) {
          spanGroups[spanGroups.length - 1].push(field.span);
          groups[groups.length - 1].push(vnode);
        } else {
          spanGroups.push([field.span]);
          groups.push([vnode]);
        }
        lastHasSpan = true;
      } else {
        lastHasSpan = false;
        spanGroups.push([]);
        groups.push([vnode]);
      }
    });
    return groups;
  }

  public calcShowState(definition: SchemaFormField) {
    if (!definition.depends) {
      return definition.visible || definition.visible === null || definition.visible === undefined;
    } else {
      if (typeof definition.depends === 'function') {
        return definition.depends(this.currentValue);
      } else {
        return !definition.depends
          .map(condition => this.matchCondition(condition))
          .some(it => !it);
      }
    }
  }

  private matchCondition(condition: ShowFieldCondition): boolean {
    if (!this.currentValue) {
      return false;
    } else {
      const currentValue = this.currentValue[condition.property];
      const compareValue = condition.value;
      if (currentValue === null || currentValue === undefined) {
        switch (condition.operator) {
          case 'in':
            return compareValue.includes(currentValue);
          case 'notIn':
            return !compareValue.includes(currentValue);
        }
        return false;
      } else {
        switch (condition.operator) {
          case '=':
            return compareValue.toString() === currentValue.toString();
          case '<':
            return parseFloat(currentValue) < parseFloat(compareValue);
          case '>':
            return parseFloat(currentValue) > parseFloat(compareValue);
          case '>=':
            return parseFloat(currentValue) >= parseFloat(compareValue);
          case '<=':
            return parseFloat(currentValue) <= parseFloat(compareValue);
          case 'in':
            return compareValue.includes(currentValue);
          case 'notIn':
            return !compareValue.includes(currentValue);
        }
      }
    }
    return true;
  }

  private renderField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number) {
    const {platform} = this;
    let value = null;
    if (field.property.includes('.')) {
      value = getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')), currentValue);
    } else {
      value = currentValue;
    }
    if (field.type === TYPES.object) {
      if (!field.props) {
        field.props = {props: this.props};
      } else {
        field.props.props = this.props;
      }
      field.props.effects = this.effects;
    }
    const iField = this.createField(field);
    // @ts-ignore
    return <FormField
      value={getFieldValue(value, iField)}
      onInput={(v) => {
        setFieldValue(value, iField, v);
      }}
      field={iField}
      path={this.buildFieldPath(field)}
      display={this.mode === 'display'}
      disabled={this.isDisabled}
      content={this.$slots[field.slot]}
      definition={field}
      key={'field-' + field.property + '-' + index}
      formValue={currentValue}
      platform={platform}/>;
  }

  private renderFields() {
    return this.renderSingleFields(this.currentValue);
  }

  get isMobile() {
    return this.platform === MOBILE;
  }

  get isDesktop() {
    return this.platform === DESKTOP;
  }

  private renderSingleFields(currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const {props} = this;
    const FormComponent = getFormComponent(this.platform);
    const groups = this.getGroups(currentValue);
    const formProps = this.getFormProps();
    return <FormComponent attrs={formProps}
                          ref="form"
                          on={this.$listeners}>
      {this.$slots.prepend}
      {!this.definition.array && this.isDesktop ? this.renderTitle() : null}
      {props && props.inline ? groups.reduce((a, b) => a.concat(b))
        : groups.map((group) => this.wrapGroup(group))}
      {this.renderDeleteSubFormButton()}
      {this.$slots.append}
    </FormComponent>;
  }

  private renderAddFormButton() {
    const ButtonComponent = getButtonComponent();
    if (this.definition.array && this.mode === 'edit') {
      return <ButtonComponent
        attrs={{
          block: true,
          icon: 'plus',
          disabled: this.isDisabled
        }}
        class="m-b"
        onClick={() => {
          this.addSubItem();
        }}>新增一条</ButtonComponent>;
    }
  }

  private addSubItem() {
    this.currentValue.push({});
  }

  private renderDeleteSubFormButton() {
    const ButtonComponent = getButtonComponent();
    return Number.isInteger(this.arrayIndex) && this.mode !== 'display' && this.platform === 'desktop' ?
      <div class="delete-item-butn-wrapper" style={{textAlign: 'right'}}>
        <ButtonComponent disabled={this.isDisabled} onClick={() => {
          this.$emit('removeArrayItem');
        }} text icon="delete" type="danger">删除该条
        </ButtonComponent>
      </div> : null;
  }

  private wrapGroup(group: any) {
    const RowComponent = getRowComponent();
    const {props} = this;
    if (this.isMobile || group.length === 1) {
      return group;
    }
    return <RowComponent gutter={props && props.gutter || 0}>{group}</RowComponent>;
  }


  public createField(definition: SchemaFormField): IField {
    const plainPath = this.buildFieldPath(definition).join('.');
    const existsField: IField = this['store'].fields[plainPath];
    if (existsField) {
      existsField.display = this.mode === 'display';
      existsField.editable = !this.isDisabled && !this.isReadonly;
      return existsField;
    } else {
      return Vue.observable({
        title: definition.title,
        array: definition.array,
        type: definition.type,
        enum: definition.enum,
        processor: definition.processor,
        display: this.mode === 'display',
        editable: !this.isDisabled && !this.isReadonly,
        name: definition.property,
        path: this.buildArrayPath(definition),
        plainPath: this.buildFieldPath(definition).join('.'),
        destructPath: parseDestructPath(definition.property),
        props: Object.assign({}, definition.props),
        visible: this.calcShowState(definition),
        required: definition.required,
        fields: definition.fields,
        effectErrors: [],
        errors: [],
        hiddenFromParent: false,
        initialValue: null,
        initialize: () => {
        },
        invalid: false,
        value: null
      });
    }
  }

  public hasListener(event: string): boolean {
    return !!this.$listeners[event];
  }

  private getFormProps() {
    const formProps = Object.assign({}, this.props);
    if (this.isMobile) {
      const title = this.$slots.title || this.title;
      if (this.arrayIndex !== null && this.arrayIndex !== undefined) {
        formProps.title = <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{title + ' (' + (this.arrayIndex + 1) + ')'}</span>
          {this.arrayIndex > 0 ? <a style={{color: '#e94721', cursor: 'pointer'}}
                                    onclick={() => {
                                      this.$emit('removeArrayItem', this.arrayIndex);
                                    }}>
            <ae-icon type="delete"/>
            删除
          </a> : null}
        </div>;
      } else {
        formProps.title = title;
      }
    }
    formProps.inline = this.inline;
    formProps.disabled = this.isFormDisabled;
    return formProps;
  }

  get isFormDisabled() {
    return this.isDisabled || this.isLoading;
  }

  public validate(): Promise<boolean[]> {
    const fields = this.fields;
    if (fields.length) {
      return Promise.all(fields.map(it => it.validate()));
    }
    return null;
  }

  private buildArrayPath(field: SchemaFormField): string[] {
    if (this.pathPrefix) {
      return this.pathPrefix.concat(field.property);
    } else {
      return field.property.split('.');
    }
  }

  private buildFieldPath(field: SchemaFormField): string[] {
    if (this.pathPrefix) {
      return this.pathPrefix.concat(field.property);
    } else {
      return [field.property];
    }
  }

  get isDisabled() {
    return this['store'].disabled;
  }

  get isLoading() {
    return this['store'].loading;
  }

  get isReadonly() {
    return this['store'].readonly;
  }
}
