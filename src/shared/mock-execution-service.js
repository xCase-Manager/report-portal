/*
* Mock data functions set
*/

// exection data mock
class MockExecutionService {

  constructor() {}

  getData() {
    let data = [];
    data.push({
      title: 'Project AAA01',
      data: this.getRandomDateArray(150)
    });
      
    data.push({
      title: 'Project AAA02',
      data: this.getRandomArray(20)
    });
      
    data.push({
      title: 'Project BBB01',
      data: this.getRandomArray(10)
    });
      
    data.push({
      title: 'Project BBB02',
      data: this.getRandomArray(6)
    });
      
    return data;
  }

  // mock execution data generation
  getRandomArray(numItems) {
    let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let data = [];
    for(var i = 0; i < numItems; i++) {
      data.push({
        label: names[i],
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }

  // Create random array of objects (with date)
  getRandomDateArray(numItems) {  
    let data = [];
    let baseTime = new Date('2020-04-15T00:00:00').getTime();
    let dayMs = 24 * 60 * 60 * 1000;
    for(var i = 0; i < numItems; i++) {
      data.push({
        time: new Date(baseTime + i * dayMs),
        value: Math.round(20 + 80 * Math.random())
      });
    }
    return data;
  }
}
export default MockExecutionService