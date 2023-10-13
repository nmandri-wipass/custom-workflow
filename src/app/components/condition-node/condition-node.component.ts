import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-condition-node',
  templateUrl: './condition-node.component.html',
  styleUrls: ['./condition-node.component.css']
})
export class ConditionNodeComponent {
  @Input() node: any;

  startConnection(): void {
    // Logic to start a connection from this node
  }  
}
