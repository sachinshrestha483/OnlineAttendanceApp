using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ZoomAttendanceApp.Migrations
{
    public partial class ceddwe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "lectures",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Topic = table.Column<string>(nullable: true),
                    SubjectId = table.Column<int>(nullable: false),
                    LectureDate = table.Column<DateTime>(nullable: false),
                    ApplicationUserId1 = table.Column<string>(nullable: true),
                    ApplicationUserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lectures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_lectures_AspNetUsers_ApplicationUserId1",
                        column: x => x.ApplicationUserId1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_lectures_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_lectures_ApplicationUserId1",
                table: "lectures",
                column: "ApplicationUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_lectures_SubjectId",
                table: "lectures",
                column: "SubjectId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "lectures");
        }
    }
}
