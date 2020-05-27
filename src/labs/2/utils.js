const boolNum = num => num < 0 ? 1 : 0

// const negateSymbol = symbol => String.fromCharCode(symbol.charCodeAt(0), 773)
const negateSymbol = symbol => "!" + symbol//String.fromCharCode(symbol.charCodeAt(0), 773)

const countData = (string, values) => {
  // const bul_f = [0,0,0,0,0,1,0,1,1,0,0,1,1,1,1,1]
  const bul_f = [...string].map(num => parseInt(num))
  const len = bul_f.length
  var bul_f1 = new Array(len)
  var Zhegalkin = new Array(len)

  var count = 0
  for (var x = 0; x <= 1; x++)
    for (var y = 0; y <= 1; y++)
      for (var z = 0; z <= 1; z++)
        for (var w = 0; w <= 1; w++) {
          if (x)
            if (y)
              bul_f1[count] = 1;
            else
              if (z)
                if (w)
                  bul_f1[count] = 1
                else
                  bul_f1[count] = 0
              else
                if (w)
                  bul_f1[count] = 0
                else
                  bul_f1[count] = 1
          else
            if (y)
              if (w)
                bul_f1[count] = 1;
              else
                bul_f1[count] = 0;
            else
              bul_f1[count] = 0;
          count++
        }
  count = 0;
  var SDNF = new Array(len);
  var SKNF = new Array(len);

  for(var x = 0; x <= 1; x++)
    for(var y = 0; y <= 1; y++)
      for(var z = 0; z <= 1; z++)
        for (var w = 0; w <= 1; w++) {
          if (bul_f[count]) {
            SDNF[count] = x * 1000 + y * 100 + z * 10 + w
            SKNF[count] = 0
          } else {
            SDNF[count] = 0
            SKNF[count] = boolNum(x-1) * 1000 + boolNum(y-1) * 100 + boolNum(z-1) * 10 + boolNum(w-1)
          }
          count++;
        }

  var outputSDNF = ""
  for (var i = 0; i < len; i++)
  {
    var x = Math.floor(SDNF[i] / 1000),
        y = Math.floor(SDNF[i] % 1000 / 100),
        z = Math.floor(SDNF[i] % 100 / 10),
        w = Math.floor(SDNF[i] % 10)
    if (SDNF[i]) {
      if (x)
        outputSDNF += "x"
      else
        outputSDNF += negateSymbol("x")
      if (y)
        outputSDNF += "y"
      else
        outputSDNF += negateSymbol("y")
      if (z)
        outputSDNF += "z"
      else
        outputSDNF += negateSymbol("z")
      if (w)
        outputSDNF += "w"
      else
        outputSDNF += negateSymbol("w")
      if (!(x*y*z*w))
        outputSDNF += " ∨ "
    }
  }

  var outputSKNF = ""
  for (var i = 0; i < len; i++)
  {
    var x = Math.floor(SDNF[i] / 1000),
        y = Math.floor(SDNF[i] % 1000 / 100),
        z = Math.floor(SDNF[i] % 100 / 10),
        w = Math.floor(SDNF[i] % 10)
    if (SKNF[i]) {
      if (x)
        outputSKNF += "x"
      else
        outputSKNF += negateSymbol("x")
      outputSKNF += " ∨ "
      if (y)
        outputSKNF += "y"
      else
        outputSKNF += negateSymbol("y")
      outputSKNF += " ∨ "
      if (z)
        outputSKNF += "z"
      else
        outputSKNF += negateSymbol("z")
      outputSKNF += " ∨ "
      if (w)
        outputSKNF += "w"
      else
        outputSKNF += negateSymbol("w")
      if (SKNF[i]==101)
        ;
      else
        outputSKNF += " ∧ "
    }
  }


  const xin = values.x
  const yin = values.y
  const zin = values.z
  const win = values.w
  var outputCompare = ""
  var bybdd, bysdnf, bytable
  if (xin) {
    if (yin)
      bybdd = 1;
    else {
      if (zin) {
        if (win)
          bybdd = 1;
        else
          bybdd = 0;
      } else {
        if (win)
          bybdd = 0;
        else
          bybdd = 1;
      }
    }
  } else {
    if (yin)
      if (win)
        bybdd = 1;
      else
        bybdd = 0;
    else
      bybdd = 0;
  }

  if (SDNF[xin * 8 + yin * 4 + zin * 2 + win] !== 0)
    bysdnf = 1;
  else
    bysdnf = 0;

  if (bybdd == bysdnf && bybdd == bul_f[xin * 8 + yin * 4 + zin * 2 + win])
    outputCompare = "все переменные равны " + bybdd
  else
    outputCompare = "что-то не так"



  var outputZhegalkin = ""
  Zhegalkin[0] = bul_f[0];
  Zhegalkin[4] = (bul_f[1] != Zhegalkin[0]);
  Zhegalkin[3] = (bul_f[2] != Zhegalkin[0]);
  Zhegalkin[10] = (bul_f[3] != (Zhegalkin[0] ^ Zhegalkin[3] ^ Zhegalkin[4]));
  Zhegalkin[2] = (bul_f[4] != Zhegalkin[0]);
  Zhegalkin[9] = (bul_f[5] != (Zhegalkin[0] ^ Zhegalkin[2] ^ Zhegalkin[4]));
  Zhegalkin[8] = (bul_f[6] != (Zhegalkin[0] ^ Zhegalkin[2] ^ Zhegalkin[3]));
  Zhegalkin[14] = (bul_f[7] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[3] ^ Zhegalkin[10] ^ Zhegalkin[2] ^ Zhegalkin[9] ^ Zhegalkin[8]));
  Zhegalkin[1] = (bul_f[8] != Zhegalkin[0]);
  Zhegalkin[7] = (bul_f[9] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[1]));
  Zhegalkin[6] = (bul_f[10] != (Zhegalkin[0] ^ Zhegalkin[3] ^ Zhegalkin[1]));
  Zhegalkin[13] = (bul_f[11] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[3] ^ Zhegalkin[10] ^ Zhegalkin[1] ^ Zhegalkin[7] ^ Zhegalkin[6]));
  Zhegalkin[5] = (bul_f[12] != (Zhegalkin[0] ^ Zhegalkin[1] ^ Zhegalkin[2]));
  Zhegalkin[12] = (bul_f[13] != (Zhegalkin[0] ^ Zhegalkin[4] ^ Zhegalkin[2] ^ Zhegalkin[9] ^ Zhegalkin[1] ^ Zhegalkin[7] ^ Zhegalkin[5]));
  Zhegalkin[11] = (bul_f[14] != (Zhegalkin[0] ^ Zhegalkin[3] ^ Zhegalkin[2] ^ Zhegalkin[8] ^ Zhegalkin[1] ^ Zhegalkin[6] ^ Zhegalkin[5]));
  Zhegalkin[15] = (bul_f[15] != (Zhegalkin[0] ^ Zhegalkin[1] ^ Zhegalkin[2] ^ Zhegalkin[3] ^ Zhegalkin[4] ^ Zhegalkin[5] ^ Zhegalkin[6] ^ Zhegalkin[7] ^ Zhegalkin[8] ^ Zhegalkin[9] ^ Zhegalkin[10] ^ Zhegalkin[11] ^ Zhegalkin[12] ^ Zhegalkin[13] ^ Zhegalkin[14]));
  const arr = ["1","x","y","z","w","xy","xz","xw","yz","yw","zw","xyz","xyw","xzw","yzw","xyzw"]
  for (var i = 0; i < len; i++)
    if (Zhegalkin[i] != 0)
      outputZhegalkin += (arr[i] + " ")



  return ({
    bul_f1: bul_f1,
    Zhegalkin: Zhegalkin,
    SDNF: SDNF,
    SKNF: SKNF,
    outputSDNF: outputSDNF,
    outputSKNF: outputSKNF,
    outputCompare: outputCompare,
    outputZhegalkin: outputZhegalkin,
  })
}


//NNNNNNNNNEEEEEEEEEEXXXXXXXXTTTTTTT
// const countAdditional = (xin=0, yin=0, zin=0, win=0) => {
//   cout << "Choose action \n";
//   cout << "[0] - Show bul vector \n";
//   cout << "[1] - Compare results from BDD and SDNF counted with your x,y,z,w \n";
//   cout << "[2] - Output SDNF \n";
//   cout << "[3] - Output SKNF \n";
//   cout << "[4] - Output Zhegalkin's polynomial \n";
//   cout << "[5] - Change values of x,y,z,w \n";
//   cout << "Or enter 'q' to end program \n";
// }

export {
  countData,
}