import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'app-technology-create',
  templateUrl: './technology-create.component.html',
  styleUrls: ['./technology-create.component.scss']
})
export class TechnologyCreateComponent {

  errorMessage: string = "";

  technologyForm = this.fb.group({
    name: [null, Validators.required],
    description: [null, Validators.required],
    category: [null, Validators.required],
    ring: null,
    classification: null
  });

  rings = [
    {name: 'None', value: null},
    {name: 'Adopt', value: 'Adopt'},
    {name: 'Trial', value: 'Trial'},
    {name: 'Assess', value: 'Assess'},
    {name: 'Hold', value: 'Hold'}
  ];

  categories = [
    {name: 'Techniques', value: 'Techniques'},
    {name: 'Tools', value: 'Tools'},
    {name: 'Platforms', value: 'Platforms'},
    {name: 'Languages & Frameworks', value: 'Languages & Frameworks'}
  ];

  constructor(
    private fb: FormBuilder, 
    private technologyService: TechnologyService,
    private router: Router
    ) {}

  onSubmit(form: any): void {
    if(this.technologyForm.valid) {
      this.technologyService.create(form).subscribe({
        next: () => this.router.navigate(['/administration']),
        error: error => {
          console.error(error);
          this.errorMessage = error.error.message;
        }
      });
    }
  }
}
