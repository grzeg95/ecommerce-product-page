import {ChangeDetectionStrategy, Component, forwardRef, Input, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {SvgDirective} from '../../directives/svg.directive';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    SvgDirective
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'app-spinner d-flex user-select-none justify-content-between rounded-3'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpinnerComponent),
      multi: true,
    }
  ]
})
export class SpinnerComponent implements ControlValueAccessor {

  private static _id = 1;
  id = 'app-spinner-id-' + SpinnerComponent._id++;

  @Input() min = 0;
  @Input() max = 999;

  disabled!: boolean;
  value = ''

  public onChange = (_: any) => {
  };

  public onTouched = () => {
  };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  protected _onButtonClick($event: Event, value: number) {
    $event.stopPropagation();
    $event.preventDefault();

    if (value < this.min || value > this.max) {
      return;
    }

    this.onChange(value + '');
    this.writeValue(value + '');
  }

  protected readonly parseInt = parseInt;

  _onButtonKeydown($event: KeyboardEvent, value: number) {
    if ($event.code === 'Enter') {
      this._onButtonClick($event, value);
    }
  }
}
