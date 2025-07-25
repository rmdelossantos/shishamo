# 🌍 World Bank Data Explorer (MVP)

An educational web application built for Year 7–8 students (ages 11–13) to explore global development data from the World Bank. This is the first milestone of a multi-phase project aimed at helping students engage with real-world datasets in an intuitive and accessible way.

## Live Demo

- Production: [https://shishamo.russdelossantos.com](https://shishamo.russdelossantos.com)
- Staging (my future changes past the deadline, for studying purposes): [https://shishamo-staging.russdelossantos.com](https://shishamo-staging.russdelossantos.com)

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + ShadCN
- **Language**: TypeScript
- **Tests**: Jest + React Testing Library
- **Hosting**: Vercel (custom domain)

---

## Setup Instructions

1. **Install Node.js v22**  
   Use [nvm](https://github.com/nvm-sh/nvm) to install:
   ```bash
   nvm install 22
   nvm use 22
   ```
2. Clone the repo and install dependencies
    ```bash
    git clone https://github.com/rmdelossantos/shishamo.git
    cd shishamo
    yarn install
    ```

3. Run the development server
    ```bash
    yarn dev
    ```

4. Run tests
    ```bash
    yarn test
    ```

## Testing

- UI test implemented for the APIs, using Jest
- Test utilities scaffolded for future expansion
- Tests run automatically via GitHub Actions workflows when pull requests are opened or merged into the main branch.

## Developer Notes

- I tackled the task by structuring my work in **modular pieces**. You can see in the Git history the different branches and PRs I made for each iteration of the app. Admittedly, my commit history could be more granular, but the branches reflect clear scopes.

- I started by building a **homepage** just to get going with the codebase. I know this is typically handled by a different stack like Framer or Wix, but I thought it would be fun and useful for experimenting. It also gave me the chance to try out **ShadCN**, which helped speed up UI development.

- For the **backend**, I created the API endpoints early to explore the World Bank data and get familiar with it. This was also my first time working with **Next.js API routes**, so I used this as a learning opportunity while laying the foundation for the frontend.

- On the **frontend**, I built the pages separately:
  - `/countries`: for listing and searching countries
  - `/countries/[code]`: for displaying country indicators  
  Both pages reuse components like cards and tables.

- For **testing**, I chose to write a **UI test** for the APIs instead of frontend component tests. I felt this was more valuable within the limited timeframe, as it better reflects how the app behaves as a whole.

- I then went back and worked on **refactoring** parts of the app to improve **structure and reusability**, moving stuff around tidying up shared components.

- Finally, I deployed the app to a live domain for easier evaluation:  
  [https://shishamo.russdelossantos.com](https://shishamo.russdelossantos.com)

- I plan to continue development using a **staging branch**, deployed at:  
  [https://shishamo-staging.russdelossantos.com](https://shishamo-staging.russdelossantos.com)  
  This will be used for further changes after the deadline and for personal learning if I reach the deep-dive round.

