import { Component, OnInit, Input, HostListener, ElementRef, NgZone, ChangeDetectorRef, QueryList, ViewChildren, EventEmitter, Output } from '@angular/core';
import { Node } from '../node.model';
import { SlotType } from '../node-slot/slot-type.enum';
import { NodeSlotComponent } from '../node-slot/node-slot.component';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  SlotTypeEnum = SlotType;

  @Input()
  config: Node;

  @Output()
  addNodeEmitter = new EventEmitter();

  @ViewChildren(NodeSlotComponent) slots: QueryList<NodeSlotComponent>;

  get inputSlot(): NodeSlotComponent {
    return this.slots.find((s) => s.slotType == SlotType.Input)!;
  }

  get outputSlot(): NodeSlotComponent {
    return this.slots.find((s) => s.slotType == SlotType.Output)!;
  }

  mouseDown: boolean = false;

  constructor(private el: ElementRef, private zone: NgZone, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    // this.zone.runOutsideAngular(() => {
    //   this.el.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    //   this.el.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
    // });
  }

  onMouseDown (event: any) {
    this.el.nativeElement.style.cursor = 'grabbing';
    this.cdRef.markForCheck();
  }

  onMouseUp (event: any) {
    this.el.nativeElement.style.cursor = 'grab';
    this.cdRef.markForCheck();
  }

  addNextNode() {
    const transformString = this.el.nativeElement.style.transform;
    this.addNodeEmitter.emit(
      this.extractTranslate3DValues(transformString)
    )
  }

  extractTranslate3DValues(translate3D: string): { x: number, y: number } {
    // Use a regular expression to extract the x and y values
    const regex = /translate3d\(([-\d.]+)px, ([-\d.]+)px, ([-\d.]+)px\)/;
    const match = translate3D.match(regex);

    if (match) {
        const x = parseFloat(match[1]);
        const y = parseFloat(match[2]);
        return { x, y };
    } else {
        // Handle invalid input or no match
        throw new Error("Invalid or unsupported transform value.");
    }
  }
}