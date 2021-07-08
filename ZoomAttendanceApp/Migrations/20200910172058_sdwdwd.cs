using Microsoft.EntityFrameworkCore.Migrations;

namespace ZoomAttendanceApp.Migrations
{
    public partial class sdwdwd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lectures_AspNetUsers_ApplicationUserId1",
                table: "lectures");

            migrationBuilder.DropIndex(
                name: "IX_lectures_ApplicationUserId1",
                table: "lectures");

            migrationBuilder.DropColumn(
                name: "ApplicationUserId1",
                table: "lectures");

            migrationBuilder.AlterColumn<string>(
                name: "ApplicationUserId",
                table: "lectures",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_lectures_ApplicationUserId",
                table: "lectures",
                column: "ApplicationUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_lectures_AspNetUsers_ApplicationUserId",
                table: "lectures",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_lectures_AspNetUsers_ApplicationUserId",
                table: "lectures");

            migrationBuilder.DropIndex(
                name: "IX_lectures_ApplicationUserId",
                table: "lectures");

            migrationBuilder.AlterColumn<int>(
                name: "ApplicationUserId",
                table: "lectures",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApplicationUserId1",
                table: "lectures",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_lectures_ApplicationUserId1",
                table: "lectures",
                column: "ApplicationUserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_lectures_AspNetUsers_ApplicationUserId1",
                table: "lectures",
                column: "ApplicationUserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
