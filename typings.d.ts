interface userDetails {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: string[]
  $updatedAt: string
  email: string
  userId: string
  username: string
  total_credits: number
  total_score: number
}

interface userGamePlayed {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: string[]
  gameId: string
  userId: string
  score: number
  datePlayed: string
  timePlayed: string
  gameGrid: '4x4' | '6x6' | '8x8' | '9x9' | 'daily'
  gameType: 'sudoku' | 'sudoku-x' | 'sudoku-hyper' | 'sudoku-grays'
  gameLevel: 'easy' | 'normal' | 'hard' | 'expert'
  gameMode: 'numbers' | 'letters' | 'roman-numerals' | 'shapes' | 'colors'
  gameBoard: string
  gameSolution: string
  gameKeyboard: string
  mistakes: number
  hintsUsed: number
  complted: boolean
  creditToPlay: number
}

interface playersGameBoard {
  $collectionId: string
  $createdAt: string
  $databaseId: string
  $id: string
  $permissions: string[]
  userId: string
  total_score: number
}
