
function calculerAge(dateNaissance) {
    const maintenant = new Date();
    const naissance = new Date(dateNaissance);

    let ageAns = maintenant.getFullYear() - naissance.getFullYear();
    let ageMois = maintenant.getMonth() - naissance.getMonth();
    let ageJours = maintenant.getDate() - naissance.getDate();

    // Ajuster les mois et les jours si nécessaire
    if (ageJours < 0) {
        ageMois--;
        const moisPrecedent = new Date(maintenant.getFullYear(), maintenant.getMonth(), 0);
        ageJours += moisPrecedent.getDate();
    }

    if (ageMois < 0) {
        ageAns--;
        ageMois += 12;
    }

    return {
        ans: ageAns,
        mois: ageMois,
        jours: ageJours
    };
}


function isDateValid(year, month, day) {
    
    const date = new Date(year, month-1, day);
    console.log(date)
    if(month == 2 && day>29){
        return false;
    }
    if(((month > 6) && (month%2 !=0)) && (day > 30)){
        return false;
    }

    if(((month < 8) && (month%2 !=0))  && (day > 31)){
            return false;
    }
    
    return !isNaN(date) && date != "Invalid Date";
}


document.form_age.addEventListener('submit', (event) => {

    event.preventDefault();
    const day = document.form_age.day.value;
    const month = document.form_age.month.value;
    const year = document.form_age.year.value;
    // alert(event.target);

    if(day.trim().length > 0 && month.trim().length > 0 && year.trim().length > 0){
        const actualyear = new Date().getFullYear();
        if(isDateValid(parseInt(year), parseInt(month), parseInt(day))){
            document.querySelectorAll('.error').forEach(el=>{
                el.classList.add('hidden');
            })
                
        if(day > 0 && day <= 31 && month > 0 && month <= 12 && year >= 1  && year <= actualyear){
            const allresults = document.querySelectorAll(".result")
            const {ans, mois, jours} = calculerAge(`${year}-${month}-${day}`);
            allresults[0].querySelector('.result-title').textContent = ans.toString();
            allresults[1].querySelector('.result-title').textContent = mois.toString();
            allresults[2].querySelector('.result-title').textContent = jours.toString();
            //document.querySelector('.result').innerHTML = `${day} <span>Days</span> ${month} <span>Months</span> ${year} <span>Years</span>`;

        }

        }else{
            document.querySelectorAll('.error').forEach(el=>{
                el.classList.remove('hidden');
            })
        }
        //alert(actualyear)
    }

    
})