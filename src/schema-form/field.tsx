import Emitter from '@/mixins/emitter';
import {getFormItemComponent, getRealFields, renderField, SchemaFormStore} from '@/schema-form/internal/utils';
import {Platform, SchemaFormField} from '@/types/bean';
import {SchemaFormComponent} from '@/types/form';
import {IField} from '@/uform/types';
import AsyncValidator from 'async-validator';
import {VNode} from 'vue';
import Component, {mixins} from 'vue-class-component';
import {Inject, Prop, Watch} from 'vue-property-decorator';
import ArrayWrapper from './array-wrapper';
import {addRule, DESKTOP, getAlertComponent, getColComponent, getConfirmFunction, getOptions, TYPES} from './utils';

@Component({
  name: 'FormField'
})
export default class FormField extends mixins(Emitter) {

  @Prop(Object)
  public definition: SchemaFormField;
  @Prop([Object, Array])
  public formValue: { [key: string]: any } | [];
  @Prop({type: String, default: 'mobile'})
  public platform: Platform;
  @Prop({type: Boolean, default: true})
  public wrap: boolean;
  @Prop()
  public value: any;
  public currentValue: any = null;
  @Prop()
  public content: any;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop(Array)
  public path: string[];
  @Prop({required: true})
  public field: IField;
  @Prop({type: Object, required: true})
  public component: SchemaFormComponent;
  @Prop(Array)
  public pathPrefix: string[];
  @Inject()
  public store: SchemaFormStore;

  public renderField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number, wrap: boolean) {
    return renderField(this.pathPrefix, this.store, field, currentValue, index, wrap, this.$createElement);
  }

  get display() {
    return this.store.mode === 'display';
  }

  get options() {
    return getOptions(this.field);
  }

  get props() {
    const {field} = this;
    const props: any = Object.assign({}, this.component.getProps(field));
    const type = field.type;
    if (type === TYPES.select || type === TYPES.expandSelect) {
      props.options = this.options;
    }
    if (type === TYPES.object) {
      props.platform = this.platform;
      props.mode = this.display ? 'display' : 'edit';
      props.pathPrefix = this.path;
    }
    if (this.definition.placeholder) {
      props.placeholder = this.definition.placeholder;
    }
    if (this.display) {
      delete props.required;
    }
    return props;
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
    if (this.field.onChange) {
      this.field.onChange(currentValue);
    }
    this.$forceUpdate();
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any) {
    if (this.currentValue !== value) {
      this.currentValue = value;
    }
  }

  public created() {
    this.field.validate = this.validate;
  }

  @Watch('field', {immediate: true})
  public fieldChanged(field: IField) {
    this.dispatch('ASchemaForm', 'SchemaForm.addSchemaField', [field]);
  }

  public beforeDestroy() {
    this.dispatch('ASchemaForm', 'SchemaForm.removeSchemaField', [this.field]);
  }

  public renderInputComponent() {
    const {props, currentValue, definition} = this;
    const inputFieldDef = this.component;
    const InputFieldComponent = inputFieldDef.component;
    if (this.content) {
      return this.content;
    }
    if (this.display && this.definition.displayValue) {
      if (typeof this.definition.displayValue === 'function') {
        return this.definition.displayValue(this.currentValue);
      } else {
        return this.definition.displayValue;
      }
    }
    if (inputFieldDef.layout) {
      props.layout = this.definition.layout;
      const noWrap = inputFieldDef.layoutOptions && inputFieldDef.layoutOptions.wrapItems === false;
      props.fields = getRealFields(this.definition.fields).map((field, index) => {
        return this.renderField(field, this.currentValue, index, !noWrap);
      });
    }
    if (this.field.array && inputFieldDef.forArray === false) {
      // @ts-ignore
      return <ArrayWrapper
          disabled={this.disabled}
          subForm={this.field.type === TYPES.object}
          addBtnText={props.addBtnText}
          ref="array"
          platform={this.platform}
          addBtnProps={props.addBtnProps}
          cellSpan={props.cellSpan}
          onAdd={() => {
            this.addArrayItem();
          }}>
        {
          this.currentValue ? this.currentValue.map((v, index) => {
            const itemProps = Object.assign({}, props, {
              pathPrefix: this.path.concat(index)
            });
            if (this.field.type === TYPES.object) {
              itemProps.definition = Object.assign({}, itemProps.definition);
              delete itemProps.definition.array;
            }
            // @ts-ignore
            return <InputFieldComponent
                attrs={itemProps}
                arrayIndex={index}
                disabled={this.disabled}
                onRemoveArrayItem={async () => {
                  const confirmFunc = getConfirmFunction(this.platform);
                  await this[confirmFunc]('确定删除该条吗？', '提示');
                  this.currentValue.splice(index, 1);
                }}
                value={v}
                title={this.platform === 'mobile' ? this.field.title : null}
                onInput={(val) => {
                  this.onArrayItemInput(val, index);
                }}/>;
          }) : null
        }
      </ArrayWrapper>;
    }
    props.disabled = this.disabled;
    props.value = this.currentValue;
    props.title = props.title || (this.platform === 'mobile' ? this.field.title : null);
    if (this.definition.type === TYPES.object
        && this.definition.props) {
      if (!this.definition.props.props) {
        this.definition.props.props = {};
      }
      Object.keys(this.definition.props).forEach(key => {
        if (key !== 'props') {
          this.definition.props.props[key] = this.definition.props[key];
        }
      });
    }
    // @ts-ignore
    return <InputFieldComponent
        props={props}
        attrs={props}
        ref="input"
        onInput={this.onInput}/>;
  }

  public render() {
    const {props, field, definition, platform} = this;
    if (this.display) {
      props.definition = this.definition;
    }
    const component = this.renderInputComponent();
    let item = null;
    const FormItemComponent = getFormItemComponent(this.platform);
    const ColComponent = getColComponent();
    if (platform === DESKTOP) {
      const formItemProps = this.getFormItemProps();
      const noWrap = field.type === TYPES.object
          || (this.component.layout && this.component.layoutOptions
              && this.component.layoutOptions.wrapContainer === false)
          || !this.wrap || !formItemProps.title;
      const formItem = noWrap ? component :
          <FormItemComponent attrs={formItemProps}>
            {component}
            {this.renderNotice()}
          </FormItemComponent>;
      if (definition.span) {
        item = <ColComponent span={definition.span}>{formItem}</ColComponent>;
      } else if (definition.type === 'Extra') {
        item = component;
      } else {
        item = formItem;
      }
    } else {
      if (this.display) {
        if (this.definition.type === TYPES.object) {
          item = component;
        } else {
          item = <m-list-item title={definition.title} extra={component}/>;
        }
      } else {
        item = component;
      }
    }
    const style: any = {};
    if (!field.visible) {
      style.display = 'none';
    }
    (item as VNode).data.staticStyle = style;
    return item;
  }

  public getRules() {
    const field = this.definition;
    const rules = field.rules || [];
    if (rules.length === 0) {
      if (field.required) {
        addRule(rules, field, {required: true, message: `${field.title}为必填项`});
      }
      if (typeof field.min === 'number') {
        addRule(rules, field, {min: field.min, message: `${field.title}不能小于${field.min}`});
      }
      if (typeof field.max === 'number') {
        addRule(rules, field, {max: field.max, message: `${field.title}不能大于${field.max}`});
      }
    }
    return rules;
  }

  public onInput(value) {
    this.currentValue = value;
  }

  private renderNotice() {
    const AlertComponent = getAlertComponent();
    if (this.definition.notice) {
      return <AlertComponent message={this.definition.notice}/>;
    }
  }

  get error() {
    return this.field.errors.join('、');
  }

  public getFormItemProps() {
    const {definition} = this;
    const component = getFormItemComponent(this.platform);
    const props: any = {
      required: this.display ? null : definition.required,
      title: definition.title,
      label: definition.title
    };
    if (component === 'd-form-item' || component === 'a-form-item') {
      props.help = this.field.errors.join('、');
      if (props.help) {
        props.hasFeedback = true;
        props.validateStatus = 'error';
      }
    } else if (component === 'el-form-item') {
      props.error = this.field.errors.join('、');
    }
    return props;
  }

  public validate() {
    if (this.component.layout) {
      return true;
    }
    const {field} = this;
    if (this.definition.type === TYPES.object
        && this.$refs.array) {
      const array = this.$refs.array as any;
      const validateFields = array.$children.filter(it => it.validate);
      return new Promise((resolve) => {
        Promise.all(validateFields.map(it => {
          return it.validate();
        })).then((values) => {
          resolve(values.filter(it => !!it).flat());
        });
      });
    }
    const rules = this.getRules();
    if (rules.length) {
      const validator = new AsyncValidator({
        [field.plainPath]: rules
      });
      let value = this.currentValue;
      if ([TYPES.integer, TYPES.double, TYPES.number].includes(this.field.type as any)) {
        value = parseFloat(value);
      }
      const model = {
        [field.plainPath]: value
      };
      return new Promise((resolve) => {
        validator.validate(model, {firstFields: true}, (errors) => {
          if (errors) {
            field.valid = false;
            field.errors = errors.map(error => error.message);
          } else {
            field.valid = true;
            field.errors = [];
          }
          this.$forceUpdate();
          if (errors) {
            resolve(errors.map(it => ({message: it.message, path: this.field.plainPath})));
          } else {
            resolve(null);
          }
        });
      });
    }
    return true;
  }

  private addArrayItem() {
    if (this.currentValue) {
      if (this.definition.type === TYPES.object) {
        this.currentValue.push({});
      } else {
        this.currentValue.push(null);
      }
    } else {
      if (this.definition.type === TYPES.object) {
        this.currentValue = [{}];
      } else {
        this.currentValue = [null];
      }
    }
  }

  private onArrayItemInput(val: any, index: number) {
    this.currentValue[index] = val;
    this.onInput(this.currentValue);
  }
}
