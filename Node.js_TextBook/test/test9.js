import commonJS from "/js/common.js";


      const changeViewTest = (typeNum) => {
        const obj1 = document.querySelector("#sampleNhnGrid");
        const obj4 = document.querySelector("#sampleRandomChart");
        const obj2 = document.querySelector("#registDataArea");
        const obj3 = document.querySelector("#searchListArea");
        if (typeNum == 1) {
          document.getElementById('registIdTxt').value = '';
          document.getElementById('registTitleTxt').value = '';
          document.getElementById('registTestIdTxt').value = '';
          document.getElementById('registContentsTxt').value = '';

          makeSampleRegistGrid([]);

          obj1.style.display = 'none';
          obj2.style.display = '';
          obj3.style.display = 'none';
          obj4.style.display = 'none';
        } else if (typeNum == 2) {
          document.getElementById('searchIdTxt').value = 'tttt';
          document.getElementById('searchTitleTxt').value = 'tttttt';

          makeSampleGrid([]);

          obj1.style.display = 'none';
          obj2.style.display = 'none';
          obj3.style.display = '';
          obj4.style.display = 'none';
        } else if (typeNum == 3) {
          //obj4.innerHTML = "";
          obj1.style.display = 'none';
          obj2.style.display = 'none';
          obj3.style.display = 'none';
          obj4.style.display = '';
          makeRamdomChart();
        } else if (typeNum == 4) {
          //obj1.innerHTML = "";
          obj1.style.display = '';
          obj2.style.display = 'none';
          obj3.style.display = 'none';
          obj4.style.display = 'none';
          makeRandomGrid();
        }
      }

      const aObjArr = document.getElementsByName("aLinkMenuList");
      for (let i = 0, iSize = aObjArr.length; i < iSize; i++) {
        let idx = i + 1;
        aObjArr[i].addEventListener("click", () => {
          changeViewTest(idx);
        }, false);
      }


      let sampleListGrid;
      let sampleRegistGrid;

      const makeSampleRegistGrid = (gridData) => {

        if (sampleRegistGrid) {
          sampleRegistGrid.resetData(gridData);
          return;
        }
        sampleRegistGrid = new tui.Grid({
          el: document.getElementById('displayRegisterViewDiv'),
          data: gridData,
          scrollX: false,
          bodyHeight: 500,
          columns: [
            {
              header: 'ID',
              name: 'ID',
              align: 'center'
            },
            {
              header: 'TITLE',
              name: 'TITLE',
              className: 'clickable'
            },
            {
              header: 'SUB ID',
              name: 'TEST_ID',
              align: 'center'
            },
            {
              header: 'CONTENTS',
              name: 'CONTENTS',
              align: 'center'
            },
            {
              header: 'CREATE_DATE',
              name: 'CREATE_DATE',
              align: 'center'
            },
            {
              header: 'DTL_CREATE_DATE',
              name: 'DTL_CREATE_DATE',
              align: 'center'
            }
          ]
        });
      };

      const makeSampleGrid = (gridData) => {
        //document.getElementById('displayListViewDiv').innerHTML = "";

        if (!Array.isArray(gridData)) {
          alert("데이터를 확인할 수 없습니다.");
          return;
        }

        if (sampleListGrid) {
          sampleListGrid.resetData(gridData);
          return;
        }
        sampleListGrid = new tui.Grid({
          el: document.getElementById('displayListViewDiv'),
          data: gridData,
          scrollX: false,
          bodyHeight: 500,
          columns: [
            {
              header: 'ID',
              name: 'ID',
              align: 'center'
            },
            {
              header: 'TITLE',
              name: 'TITLE',
              className: 'clickable'
            },
            {
              header: 'SUB ID',
              name: 'TEST_ID',
              align: 'center'
            },
            {
              header: 'CONTENTS',
              name: 'CONTENTS',
              align: 'center'
            },
            {
              header: 'CREATE_DATE',
              name: 'CREATE_DATE',
              align: 'center'
            },
            {
              header: 'DTL_CREATE_DATE',
              name: 'DTL_CREATE_DATE',
              align: 'center'
            }
          ]
        });
      };


      const makeSampleDBList = async () => {
        const url = "/samples/list";

        let id = document.getElementById('searchIdTxt').value;
        let title = document.getElementById('searchTitleTxt').value;

        const params = {
          ID: id,
          TITLE: title
        };

        const result = await commonJS.sendPostAjax(url, params);
        makeSampleGrid(result.data.sampleData);
      };

      const makeSampleDBRegist = async () => {

        const url = "/samples/regist";

        let id = document.getElementById('registIdTxt').value;
        let title = document.getElementById('registTitleTxt').value;
        let test_id = document.getElementById('registTestIdTxt').value;
        let contents = document.getElementById('registContentsTxt').value;
        const params = {
          masterArray: [id, title],
          dtlArray: [test_id, contents, id]
        };

        const result = await commonJS.sendPostAjax(url, params);
        if (result.status == 0) {
          makeSampleRegistGrid(result.data.sampleData);
        } else {
          alert(result.message);
          if (confirm("상세내역을 확인하시겠습니까?")) {
            alert(JSON.stringify(result.data.sampleData));
          }
        }
      };


      //await makeSampleDBList();


      const makeRandomGrid = () => {
        document.getElementById('displayGridViewDiv').innerHTML = "";
        const gridData = [];
        (function () {
          for (let i = 0; i < 120; i += 1) {
            gridData.push({
              c1: 'User' + (i + 1),
              c2: ((i + 5) % 8) * 100 + i,
              c3: ((i + 3) % 7) * 60
            });
          }
        })();

        const grid = new tui.Grid({
          el: document.getElementById('displayGridViewDiv'),
          data: gridData,
          scrollX: false,
          bodyHeight: 500,
          rowHeaders: ['rowNum'],
          columns: [
            {
              header: 'User ID',
              name: 'c1',
              align: 'center',
              editor: 'text'
            },
            {
              header: 'Score',
              name: 'c2',
              className: 'clickable',
              editor: 'text'
            },
            {
              header: 'Item Count',
              name: 'c3',
              editor: 'text'
            }
          ],
          summary: {
            height: 40,
            position: 'bottom', // or 'top'
            columnContent: {
              c2: {
                template: function (valueMap) {
                  return `MAX: ${valueMap.max}<br>MIN: ${valueMap.min}`;
                }
              },
              c3: {
                template: function (valueMap) {
                  return `TOTAL: ${valueMap.sum} <br>AVG: ${valueMap.avg.toFixed(2)}`;
                }
              }
            }
          }
        });
      }


      const makeRamdomChart = () => {
        document.getElementById('displayChartViewDiv').innerHTML = "";
        function getrandom(num, mul) {
          var value = [];
          for (let i = 0; i <= num; i++) {
            var rand = Math.random() * mul;
            value.push(rand);
          }
          return value;
        }

        var data = [
          {
            opacity: 0.4,
            type: 'scatter3d',
            x: getrandom(50, -75),
            y: getrandom(50, -75),
            z: getrandom(50, -75),
          },
          {
            opacity: 0.5,
            type: 'scatter3d',
            x: getrandom(50, -75),
            y: getrandom(50, 75),
            z: getrandom(50, 75),
          },
          {
            opacity: 0.5,
            type: 'scatter3d',
            x: getrandom(50, 100),
            y: getrandom(50, 100),
            z: getrandom(50, 100),
          }
        ];
        var layout = {
          scene: {
            aspectmode: "manual",
            aspectratio: {
              x: 1, y: 0.7, z: 1,
            },
            xaxis: {
              nticks: 9,
              range: [-200, 100],
            },
            yaxis: {
              nticks: 7,
              range: [-100, 100],
            },
            zaxis: {
              nticks: 10,
              range: [-150, 100],
            }
          },
        };
        Plotly.newPlot('displayChartViewDiv', data, layout, { 'displaylogo': false });
      }

      document.querySelector("#searchActionBtn").addEventListener("click", makeSampleDBList, false);
      document.querySelector("#registActionBtn").addEventListener("click", makeSampleDBRegist, false);

      // 초기화
      changeViewTest(2);
