import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-request-node',
  templateUrl: './request-node.component.html',
  styleUrls: ['./request-node.component.css']
})
export class RequestNodeComponent {

  @Input() node: any;

  @Output() nodeClicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.nodeClicked.emit();
  }

  startConnection(): void {
    // Logic to start a connection from this node
  }
}