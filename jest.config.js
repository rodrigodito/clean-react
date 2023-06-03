module.exports ={
  roots: ['<rooDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts, tsx}'
  ],
  coverageDirectory: 'coverage',
  testeEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  } 
}