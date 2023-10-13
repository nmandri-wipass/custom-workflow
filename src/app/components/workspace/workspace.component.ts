import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { NodeManagementService } from '../../services/NodeManagementService/node-management.service';
import { ConnectionService } from '../../services/ConnectionService/connection.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface Node {
  id: number;
  type?: string;
  data?: any;
  position?: { x: number, y: number };
}

interface Connection {
  startNodeId: number;
  endNodeId: number;
}

interface RequestNode {
  id: number;
  position: { x: number, y: number };
  nextNodeId?: number; // This will help to know which node this node is connected to
}

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html'
})
export class WorkspaceComponent implements AfterViewInit {
  
  @ViewChild('workspace') workspaceRef!: ElementRef;

  nodes$: Observable<Node[]> = this.nodeService.nodes$;

  connections$: Observable<Connection[]> = this.connectionService.connections$;

  workspaceData$ = combineLatest([this.nodes$, this.connections$]).pipe(
    map(([nodes, connections]) => ({ nodes, connections }))
  );

  private connectingNode?: Node;

  // requestNodes: RequestNode[] = [
  //   { id: 1, position: { x: 50, y: 50 }, nextNodeId: 2 },
  //   { id: 2, position: { x: 200, y: 200 } },
  //   // ... more nodes
  // ];

  constructor(
    private nodeService: NodeManagementService,
    private connectionService: ConnectionService,
    private cdRef: ChangeDetectorRef
  ) {}

  workspaceWidth = 0;
  workspaceHeight = 0;

  ngAfterViewInit() {
    this.workspaceWidth = this.workspaceRef.nativeElement.offsetWidth;
    this.workspaceHeight = this.workspaceRef.nativeElement.offsetHeight;
  }

  // getNodePosition(nodeId: number): { x: number, y: number } {
  //   const node = this.requestNodes.find(n => n.id === nodeId);
  //   const position = node ? node.position : { x: 0, y: 0 };
  //   console.log(`Node ID: ${nodeId}, Position:`, position);
  //   return position;
  // }
    
  onNodeDropped(event: any): void {
    // Log the event to inspect its structure
    console.log('Dropped event:', event);

    // Extract data from the dropped event (assuming it has a 'data' property with 'type' and 'data' sub-properties)
    // const { type, data } = event.item.data;

    // Use the drop point as the node position
    const dropPoint = event.dropPoint;
    const dropX = dropPoint.x;
    const dropY = dropPoint.y;

    const newNode: Node = {
      id: Math.floor(Math.random() * 100000), // Just a random ID for demonstration
      type: 'request',
      data: {},
      position: { x: dropX, y: dropY }
    };

    console.log("newNode: ", newNode);
    this.nodeService.addNode(newNode);
    this.cdRef.detectChanges();
  }
  // onNodeDropped(event: CdkDragDrop<any[]>): void {
  //   console.log('Dropped:', event);
  //   const newNode: Node = {
  //     id: Math.floor(Math.random() * 100000),
  //     type: 'request', // or other type based on your logic or event.item.data.type
  //     data: {},
  //     position: { x: event.distance.x, y: event.distance.y }
  //   };
  //   this.nodeService.addNode(newNode);
  // }
  
  startConnection(node: Node): void {
    // If we're already trying to connect a node, set the current node as the end node and establish the connection
    if (this.connectingNode) {
      this.connectionService.connectNodes(this.connectingNode.id, node.id);
      this.connectingNode = undefined;  // Reset the connectingNode
    } else {
      // Otherwise, set the current node as the starting node for a potential connection
      this.connectingNode = node;
    }
  }

  getNodePosition(nodeId: number): { x: number, y: number } {
    const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (nodeElement) {
        const rect = nodeElement.getBoundingClientRect();
        return {
            x: rect.left + (rect.width / 2),
            y: rect.top + (rect.height / 2)
        };
    }
    return { x: 0, y: 0 }; // Default, though ideally this shouldn't happen
  }

  getNodeCenterPosition(nodeId: number): { x: number, y: number } {
    const nodeElement = document.querySelector(`[data-node-id="${nodeId}"]`);
    if (nodeElement) {
      const rect = nodeElement.getBoundingClientRect();
      console.log(`Position for Node ID ${nodeId}:`, rect);
      return {
        x: rect.left + window.scrollX + (rect.width / 2),
        y: rect.top + window.scrollY + (rect.height / 2)
      };
    }
    console.warn(`Node element not found for ID ${nodeId}`);
    return { x: 0, y: 0 };
  }
}