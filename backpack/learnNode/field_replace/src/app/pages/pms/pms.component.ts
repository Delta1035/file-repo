import { Component, OnInit } from '@angular/core';
import { PermissionsService } from '@commonService/permissions.service';
import { UtilitiesService } from '@commonService/pms/utilities.service';
import { UtilsService } from '@commonUtils/utils.service';

@Component({
  selector: 'app-pms',
  templateUrl: './pms.component.html',
  styleUrls: ['./pms.component.scss']
})
export class PmsComponent implements OnInit {
  isReady = false;
  constructor(
    private Utilities: UtilitiesService,
    public utils: UtilsService,
    private permission: PermissionsService
  ) { }

  ngOnInit(): void {
    this.getPMSToken();
  }


  async getPMSToken() {
    try {
      //TODO 目前便于开发, 后续需要修改
      const userID = this.permission.userInfo.empno;
      if (!this.utils.getLocalStorage('pmsToken')) {
        const TOKEN = await this.Utilities.getAPIToken(userID);
        this.isReady = true;
        this.utils.setLocalStorage('pmsToken', TOKEN.token);
      } else {
        this.isReady = true;
      }
    } catch (error) {
      this.isReady = false;
    }

  }

}
