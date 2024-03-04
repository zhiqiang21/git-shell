const fs = require('fs');
const readline = require('readline');
const ExcelJS = require('exceljs');

const mtReg = /美团/;
const sanReg = /三快在线/;

type moneyMap = Map<string, number []>

async function txtToExcel(txtFilePath: string, excelFilePath: string) {
  // 创建一个Excel工作簿和一个工作表
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  const expenseWorkSheet = workbook.addWorksheet('Sheet 2');

  // 定义Excel文件的列
  const tplColum = [
    { header: '交易日', key: 'col1' },
    { header: '交易摘要', key: 'col2' },
    { header: '金额', key: 'col3' },
    // 根据实际需要添加更多列
  ];

  // 定义Excel文件的列
  worksheet.columns = tplColum;
  expenseWorkSheet.columns = tplColum;

  // 创建一个读取文本文件的readline接口
  const rl = readline.createInterface({
    input: fs.createReadStream(txtFilePath),
    crlfDelay: Infinity, // 处理所有换行符格式
  });

  let refundMoney =0;
  let expenMoney = 0;
  let notMt = 0;

    // 分析差额
    const refundMap = new Map();
    const expenMoneyMap = new Map();
  


  // 逐行读取文本文件
  for await (const line of rl) {
    const lineArray = line.split(' ');
    const col1 = lineArray[0];
    const col2 = lineArray[2];
    const col3 = lineArray[lineArray.length - 1];

    if(!(mtReg.test(col2) || sanReg.test(col2)) && col3) {
      console.log(`--hzqlog--🍎🍎🍎--55555-`, col3, notMt)
      notMt += Number(col3.replace(/,/g, ''));
    }
    

    if(Number(col3) < 0 && (mtReg.test(col2) || sanReg.test(col2))) {
      refundMoney += Number(col3);
    } else if(Number(col3) > 0 && (mtReg.test(col2) || sanReg.test(col2))){
      expenMoney += Number(col3);
    }
    const mapKey = `${col1}-美团-${Math.abs(col3)}`;
    if (Number(col3) < 0) {
      createMap(refundMap, mapKey, Number(col3))
    } else if(Number(col3) > 0) {
      createMap(expenMoneyMap, mapKey, Number(col3))
    }
  }

  caculateMapDiff(refundMap, expenMoneyMap);
  console.log('非美团:'+notMt, '退款:' + refundMoney, '支出:' + expenMoney, '差额:' + (refundMoney+ expenMoney));
  // expenMoneyMap.forEach((value: number [], key: string) => {
  //   if(value.length !== 0) {
  //     console.log('消费:'+key, value)
  //   }
  // })



    // refundMap.forEach(function(value, key) {
  //   console.log(`--hzqlog--🍎🍎🍎--55555-`, expenseMapexpenseMap.has(key),(value + expenseMapexpenseMap.get(key) === 0))
  //   if(expenseMapexpenseMap.has(key) && (value + expenseMapexpenseMap.get(key) === 0)) {
  //     refundMap.delete(key);
  //   }
  // })

  

    // 向Excel工作表中添加行
    // worksheet.addRow({ col1, col2, col3 });

  // console.log(refundMap, expenseMapexpenseMap)

  // 将工作簿保存到文件
  // await workbook.xlsx.writeFile(excelFilePath);
  // console.log(`Excel文件已成功创建于 '${excelFilePath}'`);
}

/**
 * Creates or updates a map with the given key-value pair.
 *
 * @param {Map} resMap - the map to be modified
 * @param {any} setKey - the key to be added or updated in the map
 * @param {number} setValue - the value to be added to the map under the given key
 * @return {void}
 */
function createMap(resMap: moneyMap, setKey: string, setValue: number) {
  const absValue = Math.abs(setValue);
  
  if(resMap.has(setKey)) {
    const value = resMap.get(setKey) || [];
    value.push(absValue);
    resMap.set(setKey, value)
  } else {
    resMap.set(setKey, [absValue])
  }
}

function caculateMapDiff (refundMap: moneyMap, expenseMap: moneyMap) {
  refundMap.forEach((value: number [], key: string) => {
    const refund = value;
    const expenseKey = expenseMap.has(key);
    const expense = expenseMap.get(key) || [];

    if(expenseKey) {
      expenseMap.set(key, findArrDiff(refund, expense))
    }
  })
}

function findArrDiff(arr1: number[], arr2: number[]) {
  const res: number[] = [];
  arr2.forEach(item => {
    if(!arr1.includes(item)) {
      res.push(item);
    }
  })
  return res;
}


// 指定文本文件路径和目标Excel文件路径
txtToExcel('/Users/houzhiqiang/Mycode/git-shell/bill.txt', '/Users/houzhiqiang/Mycode/git-shell/bill.xlsx').catch(err => console.error(err));
