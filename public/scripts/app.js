/**
 * This will be the custom java script for portfolio web site
 * 
 * @author bixby
 * @studentID 301269672
 * @date Wednesday, 08 February 2022 @ 0800
 * @file app.js
 *
 */

// IIFE -- Immediately Invoked Function Expression
(function(){

    function Start()
    {
        console.log("App Started...");
    }

    window.addEventListener("load", Start);

    function formSubmitted() {
        location.href="/users"
    }
})();