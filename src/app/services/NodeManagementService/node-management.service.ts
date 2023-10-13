import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeManagementService {
  private nodesSubject = new BehaviorSubject<any[]>([]);
  nodes$ = this.nodesSubject.asObservable();

  addNode(node: any): void {
    this.nodesSubject.next([...this.nodesSubject.value, node]);
  }

  removeNode(nodeId: number): void {
    this.nodesSubject.next(this.nodesSubject.value.filter(n => n.id !== nodeId));
  }
}