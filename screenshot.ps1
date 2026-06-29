Add-Type -AssemblyName System.Windows.Forms
$screen = [System.Windows.Forms.Screen]::PrimaryScreen
$bitmap = New-Object System.Drawing.Bitmap $screen.Bounds.Width, $screen.Bounds.Height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CopyFromScreen(0, 0, 0, 0, $screen.Bounds.Size)
$bitmap.Save('C:\Users\akash\OneDrive\Desktop\insuranceCopy\screenshot.png')
$graphics.Dispose()
$bitmap.Dispose()
Write-Output 'Screenshot saved'
