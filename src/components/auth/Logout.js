function Logout() {
    localStorage.removeItem('Logged');
    window.location.href = '/';
    return null;
}

export default Logout;
