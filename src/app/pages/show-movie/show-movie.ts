import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-show-movie',
  imports: [],
  templateUrl: './show-movie.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './show-movie.css',
})
export class ShowMovie {
  showMovieData : ShowMovieType = {
    movieId : "movie-123",
    numbersColumn : 8,
    rowsName : ["A","B","C","D","E","F","G","H"],
    rowsColumn: [6,6,6,8,8,8,4,4],
    seatDetails: [
      [
      {
      label:"A1",
      rowName :"A",
      columnNumber:"1"
      },
      {
      label:"A2",
      rowName :"A",
      columnNumber:"2"
      }
    ],
    []
    ],
  };
}
export type ShowMovieType = {
  movieId : string;
  numbersColumn : number;
  rowsName : string[];
  rowsColumn : number[];
  seatDetails : seats[][]
}
export type seats = {
  label : string;
  rowName : string;
  columnNumber :string;
}
export type room = {
  roomName : string;
  totalLines : number;
  totalRows : number;
  
}