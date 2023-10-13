import { Component } from '@angular/core';
import { NodeManagementService } from '../../services/NodeManagementService/node-management.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private nodeService: NodeManagementService) {}

  addRequestNode(): void {
    this.nodeService.addNode({ type: 'request', data: { url: '' } });
  }

  addConditionNode(): void {
    this.nodeService.addNode({ type: 'condition', data: { expression: '' } });
  }
}