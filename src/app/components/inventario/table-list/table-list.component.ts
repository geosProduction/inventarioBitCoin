import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { Machine } from 'src/app/models/machine';

export class PeriodicElement {
  maker: number;
  model: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { maker: 1, model: 'Hydrogen'}, 
  { maker: 2, model: 'Helium'}, 
  { maker: 3, model: 'Lithium'}, 
  { maker: 4, model: 'Beryllium'},
  { maker: 5, model: 'Boron'}, 
  { maker: 6, model: 'Carbon'}, 
  { maker: 7, model: 'Nitrogen'},
  { maker: 8, model: 'Oxygen'},
  { maker: 9, model: 'Fluorine'},
  { maker: 10, model: 'Neon'},
];

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  displayedColumns: string[] = ['model','hashrate', 'state', 'Modificar', 'Eliminar'];
  // dataSource = new MatTableDataSource<Machine>();
  dataSource= new MatTableDataSource(ELEMENT_DATA);
  machines;

  constructor(public inventoryService: InventarioService) { }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.inventoryService.getInventory().subscribe(data => {
      this.machines = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Machine
        };
      })
      console.log(this.machines)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getInventory() {

  }
}


