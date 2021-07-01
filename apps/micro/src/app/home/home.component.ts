import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

enum IMode {
  create,
  update,
  delete,
}

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  price;
  mode: IMode;
  widgets: Widget[];

  updateWidgetsAndRecalculateCost(widget: Widget, widgets: Widget[], mode: IMode,) {
    this.widgets = this.updateWidgets(widget, widgets, mode);

    this.price = this.getTotalPrice(widgets);
  }

  updateWidgets(widget: Widget, widgets: Widget[], mode: IMode,) {
    switch (mode) {
      case IMode.create:
        return this.addWidget(widget, widgets);

      case IMode.update:
        return this.updateWidget(widget, widgets);

      case IMode.delete:
        return this.deleteWidget(widget, widgets);

      default:
        break;
    }
  }

  addWidget(widget: Widget, widgets: Widget[]) {
    const newWidget = Object.assign({}, widget, { id: uuidv4() });
    return  [...widgets, newWidget];
  }

  updateWidget(widget: Widget, widgets: Widget[]) {
    return widgets.map(_widget => widget.id === _widget.id ? Object.assign({}, widget) : _widget);
  }

  deleteWidget(widget: Widget, widgets: Widget[]) {
    return widgets.filter(_widget => widget.id !== _widget.id);
  }

  getTotalPrice(widgets: Widget[]) {
    return widgets.reduce((acc, curr) => acc + curr.price, 0)
  }

}
