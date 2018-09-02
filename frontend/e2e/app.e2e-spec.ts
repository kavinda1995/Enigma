import { ZondimoPage } from './app.po';

describe('zondimo App', () => {
  let page: ZondimoPage;

  beforeEach(() => {
    page = new ZondimoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
