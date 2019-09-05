const LoginActions = require('../specs/Login/actions/Login_pa');
const page = new LoginActions();
const credentials = require('./../credentials.json');

class HelpClass 
{

    clickMovieInList(name) {
        const movie = $$(`//div[contains(., '${name}')]/../../a[contains(@class, "movie-link")]`);
        if (movie.length === 0) {
            throw new Error(`"${name}" movie is not found`);
        }
        movie[0].scrollIntoView({block: "center"});
        movie[0].click();
    }

    loginWithDefaultUser() {
        browser.maximizeWindow();
        browser.url(credentials.appUrl);

        page.enterEmail(credentials.email);
        page.enterPassword(credentials.password);
        page.clickLoginButton();
    }
    
    loginWithCustomUser(email, password) {
        browser.maximizeWindow();
        browser.url(credentials.appUrl);

        page.enterEmail(email);
        page.enterPassword(password);
        page.clickLoginButton();
    }

    search(value) {
        const searchInput = $('input.search-input');
        searchInput.waitForDisplayed();
        searchInput.clearValue();
        searchInput.setValue(value);
        browser.keys("\uE007"); 
    }

    countItems(items) {
        items[0].waitForDisplayed(3000);
        return items.length;
    }
}

module.exports = new HelpClass();