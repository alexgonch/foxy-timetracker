# Foxy TimeTracker

Open source & completely free online time-tracking app with strong emphasis on user experience. Currently under active development. Feel free to try out latest development build here: https://foxytimetracker.com

### Who is this for

Foxy TimeTracker is designed with individuals in mind (freelancers, contractors, etc). If enough traction will be gained, it might be extended to support organizations as well.

### What makes it special

* Minimalistic – interact with your data with the least amount of clicks, see only what's important
* Blazing-fast operation – your interactions have zero-latency feedback
* All modern devices supported – optimized for desktop, tablet and mobile users
* Offline use – does not require Internet connection to operate, syncs automatically on reconnection
* Free and open source – do whatever you want with it (as long as it's compliant with the [license](https://github.com/alexgonch/foxy-timetracker/blob/master/LICENSE))

### Features

Foxy TimeTracker currently only provides the solution for efficient time-tracking for individuals. There is no invoicing, budgets, or teams.

These features are on the short-term roadmap and are to be implemented by the end of 2019:

* Data export (PSD, csv)
* Shareable reports (reports will be shared via securely generated URLs)
* User account settings (persistent theme, first day of the week, name & email change, and more)

## Technology used

* Bootstrapped with [create-react-app](https://github.com/facebook/create-react-app)
* The app is implemented using latest React v16.9 development practices (functional components, hooks, contexts)
* UI backbone implemented with [Material UI](https://material-ui.com/)
* Hosted with [Firebase Hosting](https://firebase.google.com/docs/hosting)
* Authentication implemented with [Firebase Auth](https://firebase.google.com/docs/auth)
* Data stored and served by [Google Cloud Firestore](https://cloud.google.com/firestore/)
