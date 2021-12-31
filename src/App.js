import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import { getRandomColor } from './Utils';
import { isElement } from 'react-dom/cjs/react-dom-test-utils.production.min';



export default class App extends Component {

  state = {
    valueSelect: '',
    testSelect: '',
    winGame: false,
    tabValuesGame: [],
    tabValuesResult: [],
    testWin: [false, false, false, false, false, false, false, false, false]
  }

  componentDidMount() {
    this.ClickNewGame()
  }
  ClickNewGame() {
    let tabGame = []
    let tabResult = []
    for (let index = 0; index < 9; index++) {
      var item = {
        value: index + 1,
        color: getRandomColor(),
      }
      tabGame.push(item)
      tabResult.push({ id: index })
    }
    this.setState({ 
      tabValuesGame: tabGame, 
      tabValuesResult: tabResult, 
      valueSelect: '',
      testSelect: '',
      winGame: false,
      testWin: [false, false, false, false, false, false, false, false, false]
    })
  }

  ClickNumber(item) {
    this.setState({ testSelect: item.value, valueSelect: item })
  }
  ClickNumberResult(item) {
    console.log(item);

    if (this.state.valueSelect != '' && item.value == undefined) {
      // console.log(item);
      //console.log(this.state.valueSelect);
      let valTabResult = this.state.tabValuesResult
      let valTabGame = this.state.tabValuesGame
      valTabResult[item.id] = this.state.valueSelect
      var indexTabGame = valTabGame.indexOf(this.state.valueSelect)
      //console.log(s);
      if (indexTabGame !== -1) {
        valTabGame.splice(indexTabGame, 1);
      }
      //valTabGame.re
      this.setState({ tabValuesResult: valTabResult, tabValuesGame: valTabGame, valueSelect: '', testSelect: '' })

      if (valTabGame.length == 0) {
        console.log('oo');
        //test du resultat final
        //pour i=0 
        let tabParcour = [1, 3, 4];
        this.testResultFinal(0, tabParcour);
        //pour i=1
        tabParcour = [0, 2, 3, 4, 5]
        this.testResultFinal(1, tabParcour);
        //pour i=2
        tabParcour = [1, 4, 5]
        this.testResultFinal(2, tabParcour);
        //pour i=3
        tabParcour = [0, 1, 4, 6, 7]
        this.testResultFinal(3, tabParcour);
        //pour i=4
        tabParcour = [0, 1, 2, 3, 5, 6, 7, 8]
        this.testResultFinal(4, tabParcour);
        //pour i=5
        tabParcour = [1, 2, 4, 7, 8]
        this.testResultFinal(5, tabParcour);
        //pour i=6
        tabParcour = [3, 4, 7]
        this.testResultFinal(6, tabParcour);
        //pour i=7
        tabParcour = [3, 4, 5, 6, 8]
        this.testResultFinal(7, tabParcour);
        //pour i=8
        tabParcour = [4, 5, 7]
        this.testResultFinal(8, tabParcour);



        let winGame = this.state.testWin
        for (let index = 0; index < winGame.length; index++) {
          if (winGame[index] == false) {
            this.setState({ winGame: false })
            break
          } else this.setState({ winGame: true })
        }

        console.log(this.state.testWin);

      }
    }
  }
  testResultFinal(i, tabParcour) {
    let valTabResult = this.state.tabValuesResult
    for (let index = 0; index < tabParcour.length; index++) {
      if (valTabResult[i].value == 9) {
        console.log('ss999');
        if (valTabResult[i].value - 1 == valTabResult[tabParcour[index]].value ) {
          let testWintemp = this.state.testWin;
          testWintemp[i] = true;
          this.setState({ testWin: testWintemp });
        }
      } else {
        if ((valTabResult[i].value + 1 == valTabResult[tabParcour[index]].value) && (valTabResult[i].value < 9)) {
          let testWintemp = this.state.testWin;
          testWintemp[i] = true;
          this.setState({ testWin: testWintemp });
        }
      }



    }
    // console.log(this.state.testWin);

  }
  render() {
    let numberGameComponent = (item) => {
      return <div className=' btn text-center mb-2'
        style={{
          marginRight: "20px",
          height: "60px", width: "60px", fontSize: "30px",
          backgroundColor: item.color,
          border: (this.state.testSelect == item.value) ? "4px dashed black" : "",
        }}
        onClick={() => this.ClickNumber(item)}
      > {item.value} </div>
    }

    let numberResultComponent = (item) => {
      return <div id='result' className='result m- d-flex justify-content-center align-items-center rounded '
        style={{
          height: "100px", width: "100px", fontSize: "35px",
          backgroundColor: item.color,
          boxShadow: "0 0em 0.28em gray",
          // borderColor
          //border: "4px dashed black",
          marginRight: "30px",
          marginBottom: "30px",
        }}
        onClick={() => this.ClickNumberResult(item)}
      > {item.value} </div>
    }

    return (

      <div className='container mt-3 px-4 '>
        <div className=' flex-row bg-warning'>
          <div style={{ fontSize: "20px" }} className='mr-4 float-start text-14'>
            123 Game
          </div>
          <button className='btn btn-primary btn-sm float-end' onClick={() => this.ClickNewGame()} > New game </button>
        </div>
        <br />
        <br />
        <div className='row'>
          {(this.state.tabValuesGame.length != 0) ?
            <div className='col-md-6 col-xs-12 col-sm-12'>
              {
                this.state.tabValuesGame.map(item => {
                  return numberGameComponent(item)
                })
              }
              <br />
              {this.state.tabValuesGame.length} moves left.
            </div>
            :
            (this.state.winGame) ?
              <div className='col-md-6 text-center col-xs-12 col-sm-12'>
                <img src='win.png' style={{ width: '160px', height: '220px' }} alt="win game" /><br />
                <span className='display-2'> You win</span>
              </div>
              : <span className='col-md-6 col-xs-12 col-sm-12'>Game finished, You lose</span>
          }
          <div className='col-md-5 col-12 col-sm-12  row '>
            {
              this.state.tabValuesResult.map(item => {
                return numberResultComponent(item)
              })
            }
          </div>
          <br />




        </div>
      </div>
    )
  }
}


