import React, { useEffect } from 'react';
import firebase from 'firebase';
import {db} from './firebase'; 
import { Grid } from '@material-ui/core';
import { setGrid } from './App.js'; 



export function ParseAndSet(grid_str, setGrid) {
   var challengeGrid = []; 
    var i = 0;
    /* challengeGrid.push("i");  
    console.log(challengeGrid[0]);*/
    while(i<=24){
        challengeGrid.push(grid_str[i]);
        console.log(challengeGrid[i]); 
        i++;
    }
    

const SIZE = 5;
  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
      grid[row][col] = challengeGrid[SIZE * row + col].toLowerCase();
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
    }
    
  }
  console.log(grid); 
  setGrid(grid); 
  return grid;
    
    }
    
var gridstrArr; 
export function ChallengeGrid(setGrid) {
    var gridstr = "" ; 
var temp = db.collection('dailyChallenge').doc('Feb6-2020')
temp.get().then(function(doc) {
    if (doc.exists) {
        gridstr = doc.data()['grid'];
        ParseAndSet(gridstr, setGrid);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
//});
//var grid = temp.doc('Feb6-2020').get()
//.then(function(snap){
/*if(snap.exists){
while(i<=25){
innerBoard.push(snap.data().grid[x][i-1]);
if(i%5===0){
grid.push(innerBoard);
innerBoard = [];
}
++i;
}*/


//return grid;
//}else{
//console.log("Grid is empty!!");
}
//});

//}