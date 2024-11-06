

const goNavigation = (num) => {
    switch ( num  ) {
        case 1 : 
            location.href = '/';
            break;
        case 2 : 
            location.href = '/samples';
            break;
        case 3 : 
            location.href = '/about';

            break;
        default : 
            alert ( num );
            break;
    }
};

const requestLogout = () => {
    alert ( 'Logout ');
    location.href = '/login';
} 

const requestLogin = () => {
    alert ( 'Go Login page ');
    location.href = '/login';
} 
