import { DashboardActions } from '../pa/dashboard-pa';
import { RegistrationActions } from '../pa/registration-pa';

const dashh = new DashboardActions();
const regact = new RegistrationActions();

describe('Master', async () => {
  it('can open EAM servise', async () => {
    browser.url('/');
    await regact.SignInAsMaster();
    await browser.pause(5000);
    await regact.Sign();
    await dashh.OpenEAM();
    await browser.pause(5000);
    await browser.reloadSession();
  });

  it('can open BS servise', async () => {
    browser.url('/');
    await regact.SignInAsMaster();
    await browser.pause(5000);
    await regact.Sign();
    await dashh.OpenBS();
    await browser.pause(5000);
    await browser.reloadSession();
  });

  it('can open SC servise', async () => {
    browser.url('/');
    await regact.SignInAsMaster();
    await browser.pause(5000);
    await regact.Sign();
    await dashh.OpenSC();
    await browser.pause(5000);
    await browser.reloadSession();
  });

  it('can open SLC servise', async () => {
    browser.url('/');
    await regact.SignInAsMaster();
    await browser.pause(5000);
    await regact.Sign();
    await dashh.OpenSLC();
    await browser.pause(5000);
    await browser.reloadSession();
  });

  it('can logout', async () => {
    browser.url('/');
    await regact.SignInAsMaster();
    await browser.pause(5000);
    await regact.Sign();
    await dashh.Logout();
    await browser.pause(5000);
    await browser.reloadSession();
  });
});
