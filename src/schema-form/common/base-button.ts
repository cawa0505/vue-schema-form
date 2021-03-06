import {EffectsContext} from 'v-schema-form-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import {SchemaFormStore} from '../internal/utils';

@Component({
  name: 'BaseButton'
})
export default class BaseButton extends Vue {
  @Prop()
  public action: (context: EffectsContext, event) => void;
  @Prop()
  public title: string;
  @Inject('store')
  public store: SchemaFormStore;


  public onClick(e) {
    if (this.action) {
      this.action(this.store.context, e);
    }
  }
}
