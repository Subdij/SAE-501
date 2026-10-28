import { Component, OnInit } from '@angular/core';
import { SorterData } from 'src/app/models/sorter-data';
import { ArraySorterService } from 'src/app/service/array-sorter.service';
import { SondageService } from 'src/app/service/sondage.service';

@Component({
  selector: 'app-sondage-details',
  templateUrl: './sondage-details.component.html',
  styleUrls: ['./sondage-details.component.scss']
})
export class SondageDetailsComponent implements OnInit{
  responses: any[] = [];
  sorters: SorterData[] = [
    {
      active: true,
      title: "Email",
      up: true,
      key: "user",
      sorter: true
    },
    {
      active: false,
      title: "Prénom",
      up: false,
      key: "first_name",
      sorter: true
    },
    {
      active: false,
      title: "Nom",
      up: false,
      key: "last_name",
      sorter: true
    },
    {
      title: "Établissement",
    },
    {
      active: false,
      title: "Code postal",
      up: false,
      key: "code_postal",
      sorter: true
    },
    {
      title: "Intéressé par",
    }
  ]

  constructor(private sondageService: SondageService, protected arraySorter: ArraySorterService) {}

  getAll(){
    this.sondageService.getAll().subscribe((userResponse: any) => {
      this.responses = userResponse;
      this.arraySorter.sortedArrayWithCurrentKeyAndOrder(this.responses);
    })
  }

  ngOnInit(): void {
    this.arraySorter.setDefaultActiveKey("user");
    this.arraySorter.setDefaultOrder();
    this.getAll();
  }
}
