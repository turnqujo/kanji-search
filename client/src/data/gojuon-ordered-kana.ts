import { ConversionItem } from './conversion-table'

function isEmptyObject(test: any) {
  return Object.keys(test).length === 0 && test.constructor === Object
}

function nullEmptyObjects(source: any[][]): (ConversionItem | null)[][] {
  return source.map((x) => x.map((y) => (isEmptyObject(y) ? null : y)))
}

export function fetchGojuonOrderedKana(): Promise<(ConversionItem | null)[][]> {
  return fetch('http://localhost:3000/gojuonOrderedKana.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}

export function fetchGojuonDakuten(): Promise<(ConversionItem | null)[][]> {
  return fetch('http://localhost:3000/gojuonDakuten.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}

export function fetchGojuonHandakuten(): Promise<(ConversionItem | null)[][]> {
  return fetch('http://localhost:3000/gojuonHandakuten.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}

export function fetchChiisaiKana(): Promise<(ConversionItem | null)[][]> {
  return fetch('http://localhost:3000/chiisaiKana.json', {
    mode: 'cors',
    method: 'GET'
  })
    .then((resp) => resp.json())
    .then(nullEmptyObjects)
}
