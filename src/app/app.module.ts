import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { RequestNodeComponent } from './components/request-node/request-node.component';
import { ConditionNodeComponent } from './components/condition-node/condition-node.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RequestNodeComponent,
    ConditionNodeComponent,
    WorkspaceComponent,
    ToolbarComponent
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
