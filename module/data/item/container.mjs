import SystemDataModel from "../abstract.mjs";
import EquippableItemTemplate from "./templates/equippable-item.mjs";
import ItemDescriptionTemplate from "./templates/item-description.mjs";
import PhysicalItemTemplate from "./templates/physical-item.mjs";
import CurrencyTemplate from "../shared/currency.mjs";

/**
 * Data definition for Backpack items.
 * @mixes ItemDescriptionTemplate
 * @mixes PhysicalItemTemplate
 * @mixes EquippableItemTemplate
 * @mixes CurrencyTemplate
 *
 * @property {object} capacity              Information on container's carrying capacity.
 * @property {string} capacity.type         Method for tracking max capacity as defined in `SW5E.itemCapacityTypes`.
 * @property {number} capacity.value        Total amount of the type this container can carry.
 * @property {boolean} capacity.weightless  Does the weight of the items in the container carry over to the actor?
 */
export default class ContainerData extends SystemDataModel.mixin(
  ItemDescriptionTemplate,
  PhysicalItemTemplate,
  EquippableItemTemplate,
  CurrencyTemplate
) {
  /** @inheritdoc */
  static defineSchema() {
    return this.mergeSchema(super.defineSchema(), {
      capacity: new foundry.data.fields.SchemaField(
        {
          type: new foundry.data.fields.StringField({
            required: true,
            initial: "weight",
            blank: false,
            label: "SW5E.ItemContainerCapacityType"
          }),
          value: new foundry.data.fields.NumberField({
            required: true,
            min: 0,
            label: "SW5E.ItemContainerCapacityMax"
          }),
          weightless: new foundry.data.fields.BooleanField({ required: true, label: "SW5E.ItemContainerWeightless" })
        },
        { label: "SW5E.ItemContainerCapacity" }
      )
    });
  }
}
