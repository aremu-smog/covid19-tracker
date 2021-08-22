# Installation 

Clone this repo by running
```bash
git clone https://github.com/aremu-smog/covid19-tracker.git
```

in your terminal

Move into the project directory by running
```bash
cd covid19-tracker
```

Install packages by running
```bash
yarn install
```

if you are using npm, run
```bash
rm yarn.lock
```
to delete the yarn.lock file and run
```bash
npm install
```

once all packages are successfully installed, run

```
yarn run start
```

or 

```
npm start
```
depending on your package manager


## Challenges
- Figuring out how D3.js works was the most tasking part of this project as it was my first time working with it; so I literarily 'googled' and 'youtubed' my way through, got some great help from VizHub as well.
- The data format returned from the API was quite different from all the examples I had seen online when it came to grouping so I kept looking for a solution to work for the data format and found none. I resorted to flattening the data.
- Absence of a User Interface (UI) to follow made the task more daunting - even though a video was provided, the direction of execution was still vague. For this, I made a mini-design based on my understanding of the texts accompanied with the video provided.


## TODO (Improvement)
The circle pointer for the cases only show up when you hover on the data point at the moment, it will be nice to have it show up when you on the line whether you are on the point on not.

## Recommendations
- I would recommend that UI designs be provided for future tasks. 

## Conclusion
Thank you for the opportunity.