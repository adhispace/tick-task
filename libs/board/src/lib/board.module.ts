import { HeaderModule } from '@tick-task/header';
import { BoardRoutingModule } from './board-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromBoard from './state/board/board.reducer';
import { BoardEffects } from './state/board/board.effects';
import { BoardDetailComponent } from './components/board-detail/board-detail.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { BoardComponent } from './components/board/board.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    BoardRoutingModule,
    ReactiveFormsModule,
    DragDropModule,
    StoreModule.forFeature(fromBoard.BOARD_FEATURE_KEY, fromBoard.reducer),
    EffectsModule.forFeature([BoardEffects]),
    HeaderModule,
  ],
  declarations: [BoardDetailComponent, BoardListComponent, BoardComponent],
})
export class BoardModule {}
