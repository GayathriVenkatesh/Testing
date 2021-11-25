// import { __toLilynote } from '../../../js/lilypond.js';

const lily = require('../src/lilypond.js')
const Activity = require('../code/activity.js')
const Logo = require('../code/logo.js')
const Turtle = require('../code/turtle.js')

const act = new Activity()
const turtle = new Turtle()
act.logo = new Logo(act)

// const lilynote = lily.__toLilynote()
// jest.mock('__toLilynote', () => jest.fn())

describe('getLilypondHeader', () => {
    test('should return the header', () => {
      expect(lily.getLilypondHeader()).not.toBeUndefined()
      expect(lily.getLilypondHeader()).not.toBe("")
      expect(lily.getLilypondHeader()).not.toBeNull()     
    })
  })
  
  describe('getTupletDuration', () => {
    test('should get the tuplet duration', () => {
      expect(lily.getTupletDuration()).toBe(20) 
    })
  })

  describe('div', () => {
    test('should calculate correctly', () => {
      expect(lily.div(15, 3)).toBe(5) 
    })
  })

describe('increment', () => {
  test('should increase the value by 1', () => {
    expect(lily.increment(2)).toBe(3)
  })
})

describe('computeCounter', () => {
  test('should calculate correctly', () => {
    expect(lily.computeCounter(1, 8)).toBe(2.6) 
    expect(lily.computeCounter(1, 3)).toBe(2.666666666666667) 
    expect(lily.computeCounter(1, 5)).toBe(2) 
    expect(lily.computeCounter(2, 10)).toBe(5) 
  })
})

describe('toFraction', () => {
  test('should return the fraction', () => {
    expect(lily.toFraction(2)).toStrictEqual([2, 1])
    expect(lily.toFraction(1)).toStrictEqual([1, 1])
    expect(lily.toFraction(-2)).toStrictEqual([-4, 2])
    expect(lily.toFraction(2.5)).toStrictEqual([5, 2])
    expect(lily.toFraction(0.333)).toStrictEqual([333, 1000])
    expect(lily.toFraction(99999999 / 100000000)).toStrictEqual([49999999, 50000000])
  })
})

describe('computeModeDef', () => {
  key = "♭𝄪♯♮𝄫"
    .toLowerCase()
    .replace("♭", "es") // check macro FLAT
    .replace("♯", "is")
    .replace("♮", "")
    .replace("𝄪", "isis")
    .replace("𝄫", "eses");
  test('should correctly compute the modeDef', () => {
    act.logo.notation = true
    expect(lily.computeModeDef("major", "key", lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,NATURAL) (1 . ,NATURAL) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })

  test('should correctly compute the modeDef when mode has /', () => {
    act.logo.notation = true
    lily.computeModeDef("major / / // //", "key", lily, act.logo, turtle, key)
    expect(act.logo.notationNotes[turtle]).toContain("_")
    expect(act.logo.notationNotes[turtle]).toBe("undefined \\key esisisiseses \\major\n \\key esisisiseses \\major_/_/_//_//\n")
  })

  test('should correctly compute the modeDef when obj[0][0] is in scale', () => {
    expect(lily.computeModeDef("major", [["C","D"],["",""],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`()\n")
  })

  test('should correctly compute the modeDef when obj[0][0] = "', () => {
    expect(lily.computeModeDef("major", [["",""],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("")
  })

  test('should correctly compute the modeDef', () => {
    expect(lily.computeModeDef("major", [["C","D"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,NATURAL) (1 . ,NATURAL) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })
  
  test('should correctly compute the modeDef', () => {
    expect(lily.computeModeDef("major", [["C","C"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,NATURAL) (1 . ,NATURAL) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })
  
  test('should correctly compute the modeDef', () => {
    expect(lily.computeModeDef("major", [["D","D"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,NATURAL) (1 . ,NATURAL) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })

  test('n = 6', () => {
    expect(lily.computeModeDef("major", [["B","B"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,NATURAL) (1 . ,NATURAL) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })

  test('n > 6', () => {
    expect(lily.computeModeDef("major", [["C♯","D♯"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,SHARP) (1 . ,SHARP) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })

  test('should correctly compute the modeDef when n > 6 (flat)', () => {
    expect(lily.computeModeDef("major", [["C♭","D♭"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,FLAT) (1 . ,FLAT) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })

  test('should correctly compute the modeDef when n > 6 (sharp)', () => {
    expect(lily.computeModeDef("major", [["C♯","D♯"],["C","D"],["C","D"]], lily, act.logo, turtle, key)).toBe("\nmajor = #`((0 . ,SHARP) (1 . ,SHARP) (2 . ,NATURAL) (3 . ,NATURAL) (4 . ,NATURAL) (5 . ,NATURAL) (6 . ,NATURAL) )\n")
  })
})

// // describe('computeNote', () => {
// //   test('should correctly compute the note', () => {
// //     expect(lily.computeNote("hi12").toBe("hi,, , "))
// //     expect(lily.computeNote(1).toBe(1))
// //     expect(lily.computeNote([1,2,3]).toBe("'''''"))
// //     expect(lily.computeNote(true).toBeNull())
// //   })
// // })

describe('findKeySignature', () => {
  test('should return the key signature', () => {
    expect(lily.findKeySignature()).toBe("FLAT SHARP")    
  })
})

describe('getEmptyString', () => {
  test('should return ""', () => {
    expect(lily.getEmptyString()).toBe("")    
  })
})

describe('getArr', () => {
  test('should return a default pair', () => {
    expect(lily.getArr()).toStrictEqual([0,0])    
  })
})

describe('findScale', () => {
  test('should return the scale', () => {
    expect(lily.getScale()).toStrictEqual(["C", "D", "E", "F", "G", "A", "B"])    
  })
})

describe('getExtendedScale', () => {
  test('should return the extended scale', () => {
    expect(lily.getExtendedScale()).toStrictEqual(["C", "D", "E", "F", "G", "A", "B", "C♭", "C♯", "D♭", "D♯", "E♭", "E♯", "F♭", "F♯", "G♭", "G♯", "A♭", "A♯", "B♭", "B♯"])    
  })
})

describe('findSong', () => {
  test('should return the song', () => {
    expect(lily.getSong()).toStrictEqual(["do", "re", "mi", "fa", "sol", "la", "ti"])    
  })
})

describe('findObj', () => {
  test('should compute the obj', () => {
    expect(lily.getObj()).toStrictEqual([["C", "D", "E", "F", "G", "A", "B"], ["do", "re", "mi", "fa", "sol", "la", "ti"], "C", "major"])    
  })
})

describe('findModeDef', () => {
  test('should return the mode def', () => {
    expect(lily.getModeDef("hi / / hi")).toBe("\nhi_/_/_hi = #`(")    
  })
})

// // CHANGE TEST DESCRIPTION
describe('processLilypondNotes, when typeof obj == string', () => {
  test('should set the font size', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, "swing", false, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "swing", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tempo swing\n\\tempo swing\n\\tempo swing\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "tempo", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tempo 3 = 6\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "markup", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n^\\markup { \\abs-fontsize #6 { 6 } } ^\\markup { \\abs-fontsize #6 { 6 } } ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "markdown", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n_\\markup { 6 } _\\markup { 6 } ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "break", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\n\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "begin crescendo", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\< \\< \\< ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "end crescendo", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\? \\? \\? ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "begin decrescendo", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\> \\> \\> ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "end decrescendo", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\! \\! \\! ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "begin slur", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n(  (  (  ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "end slur", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n)  )  )  ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "begin articulation", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n->->->")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "end articulation", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "begin harmonics", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\harmonicsOn \\harmonicsOn \\harmonicsOn ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "end harmonics", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\harmonicsOff \\harmonicsOff \\harmonicsOff ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "tie", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n~~~")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "meter", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n \\time 3/4\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "pickup", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n \\partial 3\n \\partial 3\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "voice one", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n<< { \\voiceOne }\n\\new Voice { \\voiceOne }\n\\new Voice { \\voiceOne ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "voice two", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n<< { \\voiceTwo }\n\\new Voice { \\voiceTwo }\n\\new Voice { \\voiceTwo ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "voice three", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n<< { \\voiceThree }\n\\new Voice { \\voiceThree }\n\\new Voice { \\voiceThree ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "voice four", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n<< { \\voiceFour }\n\\new Voice { \\voiceFour }\n\\new Voice { \\voiceFour ")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "one voice", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n}\n>> \\oneVoice\n}\n>> \\oneVoice\n}\n>> \\oneVoice\n")
  })
  
  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "hi", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\nhihihi")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\major\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "minor")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\minor\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "ionian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\ionian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "dorian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\dorian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "phrygian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\phrygian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "lydian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\lydian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "mixolydian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\mixolydian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "aeolian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\aeolian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "locrian")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\key esisisiseses \\locrian\n")
  })

  test('should set the font size', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, "key", true, "")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n \\key esisisiseses \\\n")
  })

  test('typeof obj[0] === string', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, ["abc", "def", "ghi"], true, "")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n   ")
  })

  test('typeof arr[0] === null', () => {
    act.logo.notation = true
    lily.processLilypondNotes(lily, act.logo, turtle, ["abc", "def", "ghi"], true, "", [null, null])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n   ")
  })
})

// // CHANGE TEST DESCRIPTION
describe('processLilypondNotes, when typeof obj != string', () => {
  test('should set the font size', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n   ")
  })

  test('should set the font size', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [1,3])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuple 8/1 { } \\tuple 8/1 { } \\tuple 8/1 { } ")
  })

  test('arr[0] == null', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [null, null])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n   ")
  })

  test('arr[0] != null, arr[0] * arr[1] <= 0', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [-1, 0])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n   ")
  })

  test('arr[0] != null, arr[0] * arr[1] = 1', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [1, 1])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuplet 1/2 { } \\tuplet 1/2 { } \\tuplet 1/2 { } ")
  })

  test('arr[0] != null, arr[0] * arr[1] <= 0, typeof notes != obj, arr[1] = 3', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [-1, 3])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n \\staccato  \\staccato  \\staccato ")
  })

  test('arr[0] != null, arr[0] * arr[1] <= 0, typeof notes != obj, arr[1] != 3', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [-1, 5])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n   ")
  })

  test('arr[0] != null, arr[0] * arr[1] <= 0, typeof notes == obj, arr[1] = 3', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [[1, 2, 3], 2, 3, 4, 5, 6], true, "major", [-1, 3])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n< note ''''' ''''' '''''>2.. \\staccato < note ''''' ''''' '''''>2.. \\staccato < note ''''' ''''' '''''>2.. \\staccato ")
  })

  test('arr[0] != null, arr[0] * arr[1] <= 0, typeof notes == obj, arr[1] = 3, len(notes) < 1', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [[], 2, 3, 4, 5, 6], true, "major", [-1, 3])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n2.. \\staccato 2.. \\staccato 2.. \\staccato ")
  })

  test('arr[0] != null, arr[0] * arr[1] <= 0, typeof notes == obj, arr[1] != 3', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [[1], 2, 3, 4, 5, 6], true, "major", [-1, 5])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n'''''2.. '''''2.. '''''2.. ")
  })

  test('arr[0] != null, arr[0] * arr[1] > 0', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [2, 3])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuple 12/1 { } \\tuple 12/1 { } \\tuple 12/1 { } ")
  })

  test('word[3] == tie', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [1,3], ["tie", "tie", "tie", "tie", "tie"])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuplet 1/2 { } ")
  })

  test('word[3] != tie', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [1,3], ["tie", "tie", "tie", "t", "tie"])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuple 8/1 { } \\tuple 8/1 { } \\tuple 8/1 { } ")
  })

  test('word[3] == null', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [1,3], ["tie", "tie", "tie", null, "tie"])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuple 8/1 { } \\tuple 8/1 { } \\tuple 8/1 { } ")
  })

  test('word[3] == null', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", [1,3], ["tie"])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuple 8/1 { } \\tuple 8/1 { } \\tuple 8/1 { } ")
  })

  test('word[3][0] == arr[0]', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", ["1","3"], ["tie", "tie", "tie", "13", "tie"])
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuple 8/1 { } \\tuple 8/1 { } \\tuple 8/1 { } ")
  })

  test('word[4] > 5', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", ["1",3], ["tie", "tie", "tie", "13", 7], false)
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuplet 1/2 { } ")
  })

  test('word[4] < 5', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", ["1",3], ["tie", "tie", "tie", "13", 2], false)
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuplet 1/1 { } ")
  })

  test('word[4] = 5', () => {
    act.logo.notation = false
    lily.processLilypondNotes(lily, act.logo, turtle, [1, 2, 3, 4, 5, 6], true, "major", ["1",3], ["tie", "tie", "tie", "13", 5], false)
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n\\tuplet 1/1 { } ")
  })

  test('should set the font size', () => {
    act.logo.notation = false
    expect(() => {
      lily.processLilypondNotes(lily, act.logo, turtle, 14, true, "major");
    }).toThrow("Obj should be a string or an array");
  })
})

describe('__processTuplet when i + j - 1 < 10', () => {
  test('nextObj === ")"', () => {
    lily.__processTuplet(act.logo, turtle, 0, -1, ")", null)
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n)} ")
  })

  test('nextObj === "markup"', () => {
    lily.__processTuplet(act.logo, turtle, 0, -1, "markup", null)
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n)} ^\\markup { \\abs-fontsize #6 {  } } } ")
  })

  test('nextObj === "markdown"', () => {
    lily.__processTuplet(act.logo, turtle, 0, -1, "markdown", null)
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n)} ^\\markup { \\abs-fontsize #6 {  } } } _\\markup {} } ")
  })

  test('i + j - 1 > 10"', () => {
    expect(lily.__processTuplet(act.logo, turtle, 0, 5, "markdown", "tie")).toBe(7)
    expect(lily.__processTuplet(act.logo, turtle, 10, 5, "markdown", "tie")).toBe(5)
    lily.__processTuplet(act.logo, turtle, 10, 3, "markdown", "tie")
    expect(act.logo.notationNotes[turtle]).toBe("\\meter\n)} ^\\markup { \\abs-fontsize #6 {  } } } _\\markup {} } ~~~~~_\\markup {} } ~~~~~} ~~~} ")
    expect(lily.__processTuplet(act.logo, turtle, 0, 5, "markdown", [1,2,3])).toBe(7)
    expect(lily.__processTuplet(act.logo, turtle, 10, 5, "markdown", [1,2,3])).toBe(5)
  })
})

describe('__processTuplet when k < count, and notes is of type object', () => {
  test('when len of notes = 1', () => {
    arr = new Array()
    arr.push(1)
    act.logo.notationNotes[turtle] = ""
    lily.__processTuplet(act.logo, turtle, 0, 3, ")", arr)
    expect(act.logo.notationNotes[turtle]).not.toContain("<")
    expect(act.logo.notationNotes[turtle]).not.toContain(">")
    expect(act.logo.notationNotes[turtle]).toContain("''''' 3''''' 3''''' 3")
  })

  test('when len of notes < 1', () => {
    arr = new Array()
    act.logo.notationNotes[turtle] = ""
    lily.__processTuplet(act.logo, turtle, 0, 3, ")", arr)
    expect(act.logo.notationNotes[turtle]).not.toContain("<")
    expect(act.logo.notationNotes[turtle]).not.toContain(">")
    expect(act.logo.notationNotes[turtle]).toBe("333)} ")
  })
  
  test('when len of notes > 1', () => {
    arr = new Array()
    for (var i = 0; i < 7; i++) {
      arr.push(i)
    }
    act.logo.notationNotes[turtle] = ""
    lily.__processTuplet(act.logo, turtle, 0, 5, ")", arr)
    expect(act.logo.notationNotes[turtle]).toContain("<")
    expect(act.logo.notationNotes[turtle]).toContain(">")
    expect(act.logo.notationNotes[turtle]).toContain(" \\staccato ")
    expect(act.logo.notationNotes[turtle]).toContain("''''' ''''' ''''' ''''' ''''' ''''' '''''")
  })

  test('when len of notes > 1 and not notes[6]', () => {
    arr = new Array()
    for (var i = 0; i < 5; i++) {
      arr.push(i)
    }
    act.logo.notationNotes[turtle] = ""
    lily.__processTuplet(act.logo, turtle, 0, 5, ")", arr)
    expect(act.logo.notationNotes[turtle]).toContain("<")
    expect(act.logo.notationNotes[turtle]).toContain(">")
    expect(act.logo.notationNotes[turtle]).not.toContain(" \\staccato ")
    expect(act.logo.notationNotes[turtle]).toContain("''''' ''''' ''''' ''''' '''''")
  })

  test('when argument is markup', () => {
    lily.__processTuplet(act.logo, turtle, 0, -1, "markup")
    expect(act.logo.notationNotes[turtle]).toContain("^\\markup { \\abs-fontsize #6 { ")
  })

  test('when argument is markdown', () => {
    lily.__processTuplet(act.logo, turtle, 0, -1, "markdown")
    expect(act.logo.notationNotes[turtle]).toContain("_\\markup {")
  })
})

describe('__processTuplet when k < count', () => {
  test('notaionNotes should be correct when notes = "tie"', () => {
    lily.__processTuplet(act.logo, turtle, 0, 5, ")", "tie")
    expect(act.logo.notationNotes[turtle]).toContain("~~~~~")
  })

  test('notaionNotes should be correct when notes is not obj or "tie"', () => {
    act.logo.notationNotes[turtle] = ""
    lily.__processTuplet(act.logo, turtle, 0, 5, ")", "who")
    expect(act.logo.notationNotes[turtle]).not.toContain("~~~~~")
    expect(act.logo.notationNotes[turtle]).not.toContain(">")
    expect(act.logo.notationNotes[turtle]).not.toContain("<")
    expect(act.logo.notationNotes[turtle]).not.toContain("3")
    expect(act.logo.notationNotes[turtle]).not.toContain("\\staccato")
  })
})

describe('__toLilynote', () => {
  test('should return the correct output', () => {
    let temp = lily.__toLilynote("some string")
    expect(temp).not.toBeNull()
    expect(temp).not.toBeUndefined()
    expect(temp).not.toBe("")
    expect(lily.__toLilynote("hi")).toBe("hi")
    expect(lily.__toLilynote(3)).toBe("'''''")

    expect(lily.__toLilynote("♮")).toBe("!")
    expect(lily.__toLilynote("♯")).toBe("is")
    expect(lily.__toLilynote("♭")).toBe("es")
    expect(lily.__toLilynote("1")).toBe(",, ")
    expect(lily.__toLilynote("2")).toBe(", ")
    expect(lily.__toLilynote("3")).toBe("")
    expect(lily.__toLilynote("4")).toBe("'")
    expect(lily.__toLilynote("5")).toBe("''")
    expect(lily.__toLilynote("6")).toBe("'''")
    expect(lily.__toLilynote("7")).toBe("''''")
    expect(lily.__toLilynote("8")).toBe("''''''")
    expect(lily.__toLilynote("9")).toBe("'''''''")
    expect(lily.__toLilynote("10")).toBe("''''''''")

    expect(temp.toLowerCase()).toEqual(temp)
    expect(temp).toMatch(/\b[^\d\W]+\b/g) // write regex for any string without digits
  })

})

describe('computeFoundNotes', () => {
  test('when obj[0][0]=="R"', () => {
    let obj = [["R"]]
    expect(lily.computeFoundNotes(obj)).toEqual(false)
  })

  test('when obj!="object"', () => {
    let obj = []
    expect(lily.computeFoundNotes(obj)).toEqual(false)
  })

  test('when obj[0]!="object"', () => {
    let obj = [""]
    expect(lily.computeFoundNotes(obj)).toEqual(false)
  })

  test('when all conditions are met', () => {
    let obj = [["S"]]
    expect(lily.computeFoundNotes(obj)).toEqual(true)
  })
})

describe('funcNum', () => {
  test('when t is a string', () => {
    let t = "5"
    expect(lily.funcNum(t)).toEqual(5)
  })

  test('when t is not a string', () => {
    let t = 5
    expect(lily.funcNum(t)).toEqual(5)
  })
})

describe('greaterThan', () => {
  test('when a is greater than b', () => {
    expect(lily.greaterThan(5,3)).toEqual(1)
  })

  test('when a is lesser than b', () => {
    expect(lily.greaterThan(5,7)).toEqual(0)
  })

  test('when a is equal than b', () => {
    expect(lily.greaterThan(5,5)).toEqual(0)
  })
})

describe('get functions', () => {
  test('getRodents', () => {
    expect(lily.getRodents()).toEqual([("mouse"),("brown rat"),("mole"),("chipmunk"),("red squirrel"),("guinea pig"),("capybara"),("coypu"),("black rat"),("grey squirrel"),("flying squirrel"),("bat")])
  })

  test('getClefs', () => {
    expect(lily.getClefs()).toEqual(["treble", "bass", "bass_8", "percussion"])
  })

  test('getNumberNames', () => {
    expect(lily.getNumberNames()).toEqual(["zero","one","two","three","four","five","six","seven","eight","nine"])
  })
})

describe('get empty', () => {
  test('retEmpty', () => {
    expect(lily.retEmpty()).toEqual("")
  })
})
