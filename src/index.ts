interface IOptions {
  strict: boolean;
}

const makeCopy = (jsonValue: any) => {
  let copyJson: any;

  if (Array.isArray(jsonValue)) {
    copyJson = [ ...jsonValue ]
  } else {
    copyJson = { ...jsonValue }
  }

  return copyJson
}

const atLeastSatisfySource = (objSource: any, objDest: any, strict: boolean = false) => {
  let satisfied: boolean = true

  if (typeof objSource === 'object') {
    // handle json object
    for (const key of Object.keys(objSource)) {
      if (strict) {
        satisfied = satisfied && objSource[key] === objDest[key]
      } else {
        // tslint:disable-next-line: triple-equals
        satisfied = satisfied &&  objSource[key] == objDest[key]
      }
    }
  } else {
    // handle primitive type
    if (strict) {
      satisfied = satisfied && objSource === objDest
    } else {
      // tslint:disable-next-line: triple-equals
      satisfied = satisfied && objSource == objDest
    }
  }

  return satisfied
}

const compareObject = (objMaster: any, objToCompare: any, opt?: IOptions): boolean => {
  let satisfied: boolean = true;

  if (Array.isArray(objMaster)) {
    satisfied = satisfied && compareArray(objMaster, objToCompare, opt);
  } else {
    satisfied = satisfied && atLeastSatisfySource(objMaster, objToCompare, opt?.strict)
  }

  return satisfied;
}

const compareArray = (jsonArrMaster: any, jsonArrToCompare: any, opt?: IOptions): boolean => {
  const arrComparison: any = makeCopy(jsonArrToCompare)
  let satisfied: boolean = true;
  for (const key of Object.keys(jsonArrMaster)) {
    // check key is number
    const isKeyNumber = Number.NaN !== Number(key)

    if (isKeyNumber) {
      let foundSatisfy = false
      for (const keyOnComp of Object.keys(arrComparison)) {
        foundSatisfy = compareObject(jsonArrMaster[key], arrComparison[keyOnComp])

        if (foundSatisfy) {
          foundSatisfy = true
          delete arrComparison[keyOnComp]
          break
        }
      }
      satisfied = satisfied && foundSatisfy
    } else {
      satisfied = satisfied && compareObject(jsonArrMaster[key], arrComparison[key], opt);
      delete arrComparison[key]
    }
  }
  return satisfied
}

export const compare = (jsonMaster: any, jsonToCompare: any, opt?: IOptions): boolean => {
  if (!jsonMaster || !jsonToCompare) return false

  if (Array.isArray(jsonMaster) || Array.isArray(jsonToCompare)) {
    if (Array.isArray(jsonMaster) && !Array.isArray(jsonToCompare) ||
      !Array.isArray(jsonMaster) && Array.isArray(jsonToCompare)) {
      return false
    }
  }

  let satisfied: boolean = true;

  if (Array.isArray(jsonMaster)) {
    satisfied = satisfied && compareArray(jsonMaster, jsonToCompare, opt);
  } else {
    satisfied = satisfied && compareObject(jsonMaster, jsonToCompare, opt);
  }

  return satisfied;
};