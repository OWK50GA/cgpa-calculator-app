(function(){
    'use strict';

    let detailsform = document.querySelector('#table-generation-form');
detailsform.addEventListener('submit', function(event){
    event.preventDefault();
    
    let myDiv = document.getElementById('form_div');
    let rows_no = parseInt(event.target.elements['courses-number'].value);
    let result_table = document.createElement('table');
    let result_form = document.createElement('form');
    result_form.appendChild(result_table);
    let thead = document.createElement('thead');
    let theadrow = document.createElement('tr');
    let td_course = document.createElement('td');
    let td_credit_load = document.createElement('td');
    let td_grade = document.createElement('td');
    let td_points = document.createElement('td');
    let theads_data = ['Course', 'Credit Load', 'Grade', 'Points'];
    [td_course.innerHTML, td_credit_load.innerHTML, td_grade.innerHTML, td_points.innerHTML] = theads_data;
    theadrow.appendChild(td_course);
    theadrow.appendChild(td_credit_load);
    theadrow.appendChild(td_grade);
    theadrow.appendChild(td_points);
    thead.appendChild(theadrow);
    result_table.appendChild(thead);
    myDiv.appendChild(result_form);
    
    let tbody = document.createElement('tbody');
    result_table.appendChild(tbody);


    let formTitle = document.querySelector('#result-table-title');
    if (result_form) {
        formTitle.innerHTML = 'My Result Sheet';
    }

    // console.log(rows_no);

    for (let i = 0; i < rows_no; i++) {
        let row = document.createElement('tr');
        tbody.appendChild(row);

        for (let i = 0; i < 4; i++) {
            let tdata = document.createElement('td');

            if (i == 0 | i == 1 | i == 2) {
                let inputField = document.createElement('input');
                inputField.setAttribute('id', `inputfield${i}`);
                if (i == 1 | i == 2) {
                    inputField.setAttribute('type', 'number');
                    inputField.required = true;
                }
                else {
                    inputField.setAttribute('type', 'text');  
                }
                tdata.appendChild(inputField);
            }

            row.appendChild(tdata);   
        }
    
    }
    

    let tfoot = document.createElement('tfoot');
    result_table.appendChild(tfoot);
    tfoot.appendChild(document.createElement('tr'));
    for (let i = 0; i < 4; i++) {
        tfoot.children[0].appendChild(document.createElement('td'));
    }
    let myGPA = document.createElement('textarea');
    result_form.appendChild(myGPA);

    let calcButton = document.createElement('button');
    calcButton.setAttribute('type', 'submit');
    calcButton.setAttribute('id', 'calculate');
    calcButton.innerText = 'Calculate CGPA';
    result_form.appendChild(calcButton);

    calcButton.addEventListener('click', function(evt){
        evt.preventDefault();

        let tdPoints = []
        let creditLoads = []
        for (let i = 0; i < tbody.children.length; i++) {
            let trow = tbody.children[i];
            let td_credit_load = parseInt(trow.children[1].children[0].value);
            // console.log(td_credit_load);
            let td_grade = parseInt(trow.children[2].children[0].value);
            // console.log(grade);
            let td_points = trow.children[3];
            let td_multiple = td_credit_load * td_grade;
            td_points.innerHTML = td_multiple
            tdPoints.push(td_multiple);
            creditLoads.push(td_credit_load);
        }

        // console.log(tdPoints);
        // console.log(creditLoads);
        let totalCreditLoads = 0;
        for (let i = 0; i < creditLoads.length; i++) {
            // totalCreditLoads = 0;
            totalCreditLoads += creditLoads[i];
        }
        // console.log(totalCreditLoads)

        let totalPoints = 0;
        for (let i = 0; i < tdPoints.length; i++) {
            totalPoints += tdPoints[i];
        }
        // console.log(totalPoints);

        let totalCredit = tfoot.children[0].children[1];
        totalCredit.innerHTML = totalCreditLoads;

        let totalPoint = tfoot.children[0].children[3];
        totalPoint.innerHTML = totalPoints;

        myGPA.innerHTML = `Your GPA is ${(totalPoints / totalCreditLoads).toFixed(2)}`;

    })

    
    
    

    // calcButton.addEventListener('click', function(evt) {
    //     evt.preventDefault();
    //     // alert('Clicked the Calc Button');


    // })
    

});



})();
