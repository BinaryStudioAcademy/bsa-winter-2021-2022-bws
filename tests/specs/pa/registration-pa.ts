import { RegistrationPage } from '../po/registration-po';
import * as testData from '../test-data/register-data.json' assert { type: 'json' };

const reg = new RegistrationPage();

class RegistrationActions {
  async OpenMasterSignInForm(): Promise<void> {
    await reg.SignInAsMaster_Button.waitForClickable({
      timeout: 2000,
    });
    await reg.SignInAsMaster_Button.click();
  }

  async OpenWorkerSignInForm(): Promise<void> {
    await reg.SignInAsWorker_Button.waitForClickable({
      timeout: 2000,
    });
    await reg.SignInAsWorker_Button.click();
  }

  async OpenSignUpForm(): Promise<void> {
    await reg.SignUp_Link.waitForClickable({
      timeout: 2000,
    });
    await reg.SignUp_Link.click();
  }

  async OpenSignInForm(): Promise<void> {
    await reg.SignIn_Link.waitForClickable({
      timeout: 2000,
    });
    await reg.SignIn_Link.click();
  }

  async FillMasterSignUpForm(): Promise<void> {
    const NewEmail = new Date().getTime() / 1000 + '@test.test';
    await reg.Email_Field.setValue(NewEmail);
    await reg.Name_Field.setValue(testData.TenantName);
    await reg.Password_Field.setValue(testData.MasterPassword);
  }

  async FillMasterSignInForm(): Promise<void> {
    await reg.Email_Field.waitForExist({
      timeout: 3000,
    });
    await reg.Email_Field.setValue(testData.Email);
    await reg.Password_Field.waitForExist({
      timeout: 3000,
    });
    await reg.Password_Field.setValue(testData.MasterPassword);
  }

  async FillWorkerSignInForm(): Promise<void> {
    await reg.TenantName_Field.waitForExist({
      timeout: 2000,
    });
    await reg.TenantName_Field.setValue(testData.TenantName);
    await reg.WorkerName_Field.waitForExist({
      timeout: 2000,
    });
    await reg.WorkerName_Field.setValue(testData.WorkerName);
    await reg.Password_Field.waitForExist({
      timeout: 2000,
    });
    await reg.Password_Field.setValue(testData.WorkerPassword);
  }

  async Sign(): Promise<void> {
    await reg.Sign_Button.waitForClickable({
      timeout: 4000,
    });
    await reg.Sign_Button.moveTo();
    await reg.Sign_Button.click();
  }

  async SignInAsMaster(): Promise<void> {
    await this.OpenMasterSignInForm();
    await this.FillMasterSignInForm();
  }

  async SignUp(): Promise<void> {
    await this.OpenMasterSignInForm();
    await this.OpenSignUpForm();
    await this.FillMasterSignUpForm();
  }
}

export { RegistrationActions };
