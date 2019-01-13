/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n:n}) 
  var rooksLeft = n;
  var rows = solution.rows();
  
  
  for (let i = 0; i < rows.length; i++){
    for (let j = 0; j < rows[i].length; j++){
      solution.togglePiece(i,j);
      if ( solution.hasRowConflictAt(i) || solution.hasColConflictAt(j) ){
        solution.togglePiece(i,j);
      } else {
        rooksLeft - 1;
      }
    }
    
  }
  solution = rows;
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n:n}) //fixme
  var rowsCounter = 0;
  var rows = solution.rows();
  var totalCount = 0;
  console.log(solution);


  var traverse = function(rowsCounter){
    if (rowsCounter === n){
      totalCount++; 
      return;
    }

    // looping thru the columns
      for (let j = 0; j < n; j++){
        solution.togglePiece(rowsCounter,j);
        if ( solution.hasRowConflictAt(rowsCounter) || solution.hasColConflictAt(j)){
          solution.togglePiece(rowsCounter,j);
        } else {
          traverse(rowsCounter + 1);
          solution.togglePiece(rowsCounter,j);
        }
      }
  
  }

  traverse(rowsCounter)
  console.log('Number of solutions for ' + n + ' rooks:', totalCount);
  return totalCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var answer;
  var deepAnswer;
  var totalCount = 0;
  var rows = solution.rows();
  var rowsCounter = 0;

  if(n === 2 || n === 3){
    return rows;
  }
  
  var queenTraverse = function(rowsCounter){
    if (rowsCounter === n){
      answer = JSON.stringify(solution.rows());
      deepAnswer = JSON.parse(answer);
      return;
    }
    
    // looping thru the columns
      for (let j = 0; j < n; j++){
        solution.togglePiece(rowsCounter,j);
        if (solution.hasAnyQueenConflictsOn(rowsCounter,j)){
          solution.togglePiece(rowsCounter,j);
        } else {
          queenTraverse(rowsCounter + 1);
          // where the solution is defined
          // your solution is untoggled below
          // grab the answer before you empty the array
          solution.togglePiece(rowsCounter,j);
        }
      }
  }

  queenTraverse(rowsCounter);
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return deepAnswer;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n:n}); //fixme
  var rowsCounter = 0;
  var totalCount = 0;

  if(n === 2 || n === 3){
    return 0;
  }
  
  var queenTraverse = function(rowsCounter){
    if (rowsCounter === n){
      totalCount++; 
      return;
    }
    // looping thru the columns
      for (let j = 0; j < n; j++){
        solution.togglePiece(rowsCounter,j);
        if ( solution.hasAnyQueenConflictsOn(rowsCounter,j) ){
          solution.togglePiece(rowsCounter,j);
        } else {
          queenTraverse(rowsCounter + 1);
          solution.togglePiece(rowsCounter,j);
        }
      }
  }

  
  queenTraverse(rowsCounter);
  console.log('Number of solutions for ' + n + ' queens:', totalCount);
  return totalCount;
};
