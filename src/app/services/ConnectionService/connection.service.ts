import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  private connectionsSubject = new BehaviorSubject<any[]>([]);
  connections$ = this.connectionsSubject.asObservable();

  connectNodes(startNodeId: number, endNodeId: number): void {
    const currentConnections = this.connectionsSubject.getValue();
    currentConnections.push({ startNodeId, endNodeId });
    this.connectionsSubject.next(currentConnections);
  }

  disconnectNodes(startNodeId: number, endNodeId: number): void {
    this.connectionsSubject.next(
      this.connectionsSubject.value.filter(c => c.startNodeId !== startNodeId || c.endNodeId !== endNodeId)
    );
  }
}