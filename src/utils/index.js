/**
 * function to detect safari browser
 * @return {bool}
 */
 export const isSafariBrowser = function () {
    let sUsrAg = navigator.userAgent;
    if ( sUsrAg.indexOf( 'Safari' ) !== -1 && sUsrAg.indexOf( 'Chrome' ) === -1 )
        return true;
    return false;
}

/**
 * function to detect Edge browser
 * @return {bool}
 */
export const isEdgeBrowser = function () {
    let sUsrAg = navigator.userAgent;
    if ( sUsrAg.indexOf( "Edge" ) > -1 )
        return true;
    return false;
}

/**
 * function to scroll to top
 */
export function scrollHandler( speed = 15, dest ) {
    let offsetTop = 0;

    // get the y pos to scroll
    if ( document.querySelector( '.page-content > .container' ) ) {
        offsetTop = document.querySelector( '.page-content > .container' ).getBoundingClientRect().top + window.pageYOffset;
    }
    if ( dest !== undefined ) offsetTop = dest;
    if ( isEdgeBrowser() ) offsetTop = 0;

    if ( isSafariBrowser() || isEdgeBrowser() ) {
        let pos = window.pageYOffset;
        let timerId = setInterval( () => {
            if ( pos <= offsetTop ) clearInterval( timerId );
            window.scrollBy( 0, -speed );
            pos -= speed;
        }, 1 );
    } else {
        window.scrollTo( {
            top: offsetTop,
            behavior: 'smooth'
        } );
    }
}