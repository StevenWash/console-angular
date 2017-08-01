import { ConsoleAngularPage } from './app.po';

describe('console-angular App', () => {
  let page: ConsoleAngularPage;

  beforeEach(() => {
    page = new ConsoleAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
