(function(){
    'use strict';

    let detailsform = document.querySelector('#table-generation-form');
    detailsform.addEventListener('submit', function(event){
        event.preventDefault();
        
        // Grabbing the Div and the Input value
        let myDiv = document.getElementById('form_div');
        let rows_no = parseInt(event.target.elements['courses-number'].value);

        // Creating the necessary elements
        let result_table = document.createElement('table');
        let result_form = document.createElement('form');
        let thead = document.createElement('thead');
        let theadrow = document.createElement('tr');
        let [td_course, td_credit_load, td_grade, td_points] = [document.createElement('td'), document.createElement('td'), 
            document.createElement('td'), document.createElement('td')];
        let theads_data = ['Course', 'Credit Load', 'Grade', 'Points'];
        [td_course.innerHTML, td_credit_load.innerHTML, td_grade.innerHTML, td_points.innerHTML] = theads_data;
        let tbody = document.createElement('tbody');
        
        // Appending the Children where necessary
        result_form.appendChild(result_table);
        theadrow.appendChild(td_course);
        theadrow.appendChild(td_credit_load);
        theadrow.appendChild(td_grade);
        theadrow.appendChild(td_points);
        thead.appendChild(theadrow);
        result_table.appendChild(thead);
        myDiv.appendChild(result_form);
        result_table.appendChild(tbody);


        // Giving the Result Sheet a Title Once Created By the User
        let formTitle = document.querySelector('#result-table-title');
        if (result_form) {
            formTitle.innerHTML = 'My Result Sheet';
        }

        for (let i = 0; i < rows_no; i++) {
            let newRow = document.createElement('tr');
            tbody.appendChild(newRow);
            // newRow.setAttribute('id') = `row1`;

            for (let i = 0; i < theadrow.children.length; i++) {
                let tdata = document.createElement('td');

                if (i == 0 | i == 1 | i == 2) {
                    let inputField = document.createElement('input');
                    inputField.setAttribute('id', `inputfield${i}`);
                    if (i == 1 | i == 2) {
                        inputField.setAttribute('type', 'number');
                    }
                    else {
                        inputField.setAttribute('type', 'text');  
                    }
                    inputField.setAttribute('required', 'true');
                    tdata.appendChild(inputField);
                }

                newRow.appendChild(tdata);   
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

    let [calcButton, resetBtn, rmvBtn] = [document.createElement('button'), document.createElement('button'), document.createElement('button')];
    calcButton.setAttribute('type', 'submit');
    resetBtn.setAttribute('type', 'reset');
    calcButton.setAttribute('id', 'calculate');
    calcButton.innerText = 'Calculate CGPA';
    resetBtn.innerText = 'Reset Form';
    rmvBtn.innerText = 'Remove Form';
    let btnPara = document.createElement('p');
    btnPara.appendChild(calcButton);
    btnPara.appendChild(resetBtn);
    btnPara.appendChild(rmvBtn);

    result_form.appendChild(btnPara);
    // result_form.appendChild(calcButton);
    // result_form.appendChild(resetBtn);
    // result_form.appendChild(rmvBtn);

    rmvBtn.addEventListener('click', function(){
        result_form.innerHTML = '';
    })    

    result_form.addEventListener('submit', function(evt){
        evt.preventDefault();

        let tdPoints = []
        let creditLoads = []
        for (let i = 0; i < tbody.children.length; i++) {
            // Grabbing the Data entered by the User

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

});



})();
