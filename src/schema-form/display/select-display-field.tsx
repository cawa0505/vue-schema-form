import {getOptions} from '@/schema-form/utils/utils';
import {SchemaFormField} from '@/types/bean';
import {IField} from '@/uform/types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'SelectDisplayField'
})
class SelectDisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop(Object)
  public field: IField;

  public render() {
    const {field, value} = this;
    const options = getOptions(field);
    if (value) {
      let selected = [];
      if (field.array) {
        selected = options.filter(it => value.includes(it[this.valueProperty]));
      } else {
        selected = options.filter(it => value === it[this.valueProperty]);
      }
      return <span>{selected.map(it => it[this.LabelProperty]).join('、')}</span>;
    } else {
      return <span/>;
    }
  }

  get valueProperty() {
    return this.field.props.valueProperty || 'value';
  }

  get LabelProperty() {
    return this.field.props.labelProperty || 'label';
  }
}

export default SelectDisplayField as any;
