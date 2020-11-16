// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// The command has been defined in the package.json file
	const disposable = vscode.commands.registerCommand('copy-code.copycode', () => {

		const fileName = vscode.window.activeTextEditor.document.fileName
		const fileExtension = fileName.split('.')[fileName.split('.').length - 1];

		// do a regular copy then edit it
		vscode.commands.executeCommand('editor.action.clipboardCopyAction').then(async () => {
			// get copied content
			const clipboardContent = await vscode.env.clipboard.readText();

			// add edited content to clipboard 
			vscode.env.clipboard.writeText(`\`\`\` ${fileExtension}\n${clipboardContent}\n\`\`\``);
		});
	});

	context.subscriptions.push(disposable);
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
