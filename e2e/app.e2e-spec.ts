import { UglyDucklingPage } from './app.po';

describe('ugly-duckling App', () => {
  let page: UglyDucklingPage;

  beforeEach(() => {
    page = new UglyDucklingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
