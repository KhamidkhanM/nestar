import { Injectable } from '@nestjs/common';

@Injectable()
export class BatchService {
	public getHello(): string {
		return 'Welcome to Nestar BATCH Server !';
	}

	public async batchRollback(): Promise<void> {
		console.log('BATCH ROLLBACK');
	}

	public async batchTopProperties(): Promise<void> {
		console.log('BATCH TOP PROPERTIES');
	}

	public async batchTopAgents(): Promise<void> {
		console.log('BATCH TOP AGENTS');
	}
}
