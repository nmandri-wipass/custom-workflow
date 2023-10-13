import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { FormsModule } from '@angular/forms';
import { NodeEditorComponent } from './components/node-editor/node-editor.component';
import { NodeComponent } from './components/node-editor/node/node.component';
import { NodeSlotComponent } from './components/node-editor/node-slot/node-slot.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeEditorComponent,
    NodeComponent,
    NodeSlotComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }